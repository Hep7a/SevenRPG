import { CommandHandler, ListenerHandler, AkairoClient } from "discord-akairo";
import { join } from "path";
import { Connection } from "typeorm";
import { dbName, owners, prefix } from "../Config";
import { ItemRepository } from "../models/customRepos/ItemRepo";
import { MobRepository } from "../models/customRepos/MobRepo";
import Database from "../structures/Database"

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        db: Connection;
    }
}

interface BotOptions {
    token?: string;
    owners?: string | string[];
}

export default class BotClient extends AkairoClient {
    public config: BotOptions;
    public db!: Connection;
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 0,
        ignorePermissions: owners
    });

    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    });

    public constructor(config: BotOptions) {
        super({
            disableMentions: "everyone",
            partials: [
                "MESSAGE",
                "CHANNEL",
                "REACTION"
            ],
            ownerID: config.owners,
        });

        this.config = config;
    }

    private async _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();

        this.db = Database.get(dbName);

        await this.db.connect();
        await this.db.synchronize();

        this.db.getCustomRepository(MobRepository).insertMobs()
        this.db.getCustomRepository(ItemRepository).insertItems()
    }

    async start() {
        await this._init();
        this.login(this.config.token)
    }
}