import { Message } from "discord.js";
import { InventoryRepository } from "../../models/customRepos/InvRepo";
import { ItemRepository } from "../../models/customRepos/ItemRepo";
import { PlayerRepository } from "../../models/customRepos/PlayerRepo";
import { Player } from "../../models/Players";
import { CommandCategoryNames, ItemNames, NoPlayerMessage } from "../../structures/Constants";
import { calculateMaxXP } from "../../structures/game/CalculateStats";
import { checkIfLevelUp } from "../../structures/game/Checks";
import { FFCommand } from "../../structures/Structures";
import { randomizeInt } from "../../structures/Util";

export default class Mine extends FFCommand {
    constructor() {
        super("mine", {
            aliases: [
                "mine"
            ],
            category: CommandCategoryNames.GAME
        });
    }

    async exec(message: Message) {
        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(message.author.id);

        if (!player) return message.util.send(NoPlayerMessage);

        const inventoryRepo = this.client.db.getCustomRepository(InventoryRepository);

        const itemRepo = this.client.db.getCustomRepository(ItemRepository);
        const item = await itemRepo.findOneByItem(ItemNames.STONE);

        const randomStone = randomizeInt(2, 1);
        const randomXP = randomizeInt(40, 35)

        const xp = await playerRepo.addXP(message.author.id, randomXP);
        await inventoryRepo.addItem(message.author.id, item.name, randomStone);

        message.util.send(`You picked up some few loose stones on the floor because you can't mine stone with your fists.\nYou got ${randomStone} stone and earnt ${randomXP}XP!`);

        const maxXP = calculateMaxXP(player.level);

        const response = checkIfLevelUp(xp, maxXP);

        if (response) {
            const level = await playerRepo.levelUp(message.author.id, xp)
            message.util.send(`LEVEL UP! You are now **Level ${level}**!`);
        }
        else message.util.send(`You have ${maxXP - xp}/${maxXP}XP left until **Level ${player.level + 1}**. `)

    }
}