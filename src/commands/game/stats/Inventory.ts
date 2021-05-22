import { MessageEmbed } from "discord.js";
import { User } from "discord.js";
import { Message } from "discord.js";
import { InventoryRepository } from "../../../models/customRepos/InvRepo";
import { ItemRepository } from "../../../models/customRepos/ItemRepo";
import { PlayerRepository } from "../../../models/customRepos/PlayerRepo";
import { Inventories } from "../../../models/Inventories";
import { Item } from "../../../models/Items";
import { CommandCategoryNames } from "../../../structures/Constants";
import { FFCommand } from "../../../structures/Structures";

export default class Inventory extends FFCommand {
    constructor() {
        super("inventory", {
            aliases: [
                "inventory",
                "inv"
            ],
            category: CommandCategoryNames.GAME,
            args: [
                {
                    id: "playerMentioned",
                    type: "user"
                }
            ]
        });
    }

    async exec(message: Message, { playerMentioned }: { playerMentioned: User }) {
        if (!playerMentioned) playerMentioned = message.author

        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(playerMentioned.id);

        const inventoryRepo = this.client.db.getCustomRepository(InventoryRepository);
        const inventories = await inventoryRepo.find({
            playerID: playerMentioned.id
        });

        const inventory = await Promise.all(inventories.map(async (v: Inventories) => {
            return {
                item: v.item,
                amount: v.amount
            }
        }));

        message.util.send(new MessageEmbed()
            .setAuthor("Inventory")
            .setDescription(inventory.sort((a, b) => a.item > b.item && 1).map(x => `**${x.item}**: ${x.amount}`))
        )
    }
}