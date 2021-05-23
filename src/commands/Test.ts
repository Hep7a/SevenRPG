import { User } from "discord.js";
import { Message } from "discord.js";
import { InventoryRepository } from "../models/customRepos/InvRepo";
import { ItemRepository } from "../models/customRepos/ItemRepo";
import { PlayerRepository } from "../models/customRepos/PlayerRepo";
import { Player } from "../models/Players";
import { ItemNames } from "../structures/Constants";
import { FFCommand } from "../structures/Structures";
import { calculateMaxXP, randomizeInt } from "../structures/Util";

export default class Test extends FFCommand {
    constructor() {
        super("test", {
            aliases: [
                "test"
            ],
            args: [
                {
                    id: "playerMentioned",
                    type: "user"
                }
            ],
            ownerOnly: true
        });
    }

    async exec(message: Message, { playerMentioned }: { playerMentioned: User }) {
        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(playerMentioned.id);

        const inventoryRepo = this.client.db.getCustomRepository(InventoryRepository);

        const itemRepo = this.client.db.getCustomRepository(ItemRepository);
        const item = await itemRepo.findOne({
            name: ItemNames.WOOD
        });

        const wood = 18
        const wood2 = 22
        const wood3 = 23

        await inventoryRepo.addItem(playerMentioned.id, item.name, wood3);

        const level = await playerRepo.addLevel(message.author.id, 1);
        const maxXP = calculateMaxXP(level);

        message.util.send(`+${wood3} to ${playerMentioned.tag}!`)
    }
}