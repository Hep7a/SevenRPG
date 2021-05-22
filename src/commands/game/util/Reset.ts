import { Message } from "discord.js";
import { InventoryRepository } from "../../../models/customRepos/InvRepo";
import { PlayerRepository } from "../../../models/customRepos/PlayerRepo";
import { CommandCategoryNames } from "../../../structures/Constants";
import { FFCommand } from "../../../structures/Structures";

export default class Reset extends FFCommand {
    constructor() {
        super("reset", {
            aliases: [
                "reset"
            ],
            category: CommandCategoryNames.GAME,
            description: {
                content: "Are you not satisfied with your journey? So be it."
            }
        });
    }

    async exec(message: Message) {
        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(message.author.id);

        if (!player) return message.util.send("You haven't made a player yet! You have to start your journey before you reset it!");

        const inventoryRepo = this.client.db.getCustomRepository(InventoryRepository);
        const inventory = await inventoryRepo.findOneByPlayer(message.author.id)

        await playerRepo.remove(player);

        return message.util.send("You have reset your player! Back to where it all began.")
    }
}