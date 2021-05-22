import { Message } from "discord.js";
import { EntityTarget } from "typeorm";
import { FFCommand } from "../structures/Structures";

export default class RemoveDatabase extends FFCommand {
    constructor() {
        super("removeDB", {
            aliases: [
                "removedb"
            ],
            args: [
                {
                    id: "entityName",
                    type: "string"
                }
            ]
        });
    }

    exec(message: Message, { entityName }: { entityName: string }) {
        const entityRepo = this.client.db.getRepository(entityName);
        entityRepo.clear();

        message.util.send(`Cleared all entities in ${entityName}`)
    }
}