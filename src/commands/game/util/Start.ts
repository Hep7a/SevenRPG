import { Message } from "discord.js";
import { InventoryRepository } from "../../../models/customRepos/InvRepo";
import { PlayerRepository } from "../../../models/customRepos/PlayerRepo";
import { CommandCategoryNames } from "../../../structures/Constants";
import { FFCommand } from "../../../structures/Structures";

export default class Start extends FFCommand {
    constructor() {
        super("start", {
            aliases: [
                "start"
            ],
            category: CommandCategoryNames.GAME,
            description: {
                content: "Time to start your journey. Get ready to fight, player."
            }
        });
    }

    async exec(message: Message) {
        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(message.author.id);

        if (player) return message.util.send('You have already created a player! Get back to your journey!');

        const inventoryRepo = this.client.db.getCustomRepository(InventoryRepository);

        playerRepo.createPlayer(message.author.id);
        inventoryRepo.createInventory(message.author.id);


        message.util.send(`Congrats <@!${message.author.id}>! You have created a player and are ready to start your journey!`)
    }
}