import { Message } from "discord.js";
import { InventoryRepository } from "../../models/customRepos/InvRepo";
import { ItemRepository } from "../../models/customRepos/ItemRepo";
import { PlayerRepository } from "../../models/customRepos/PlayerRepo";
import { CommandCategoryNames, ItemNames, ItemTypeNames, NoPlayerMessage } from "../../structures/Constants";
import { FFCommand } from "../../structures/Structures";
import { calculateMaxXP, checkIfLevelUp, randomizeInt } from "../../structures/Util";

export default class Berry extends FFCommand {
    constructor() {
        super("berry", {
            aliases: [
                "berry",
                "pick"
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
        const berries = await itemRepo.find({
            type: ItemTypeNames.BERRY
        });

        const leaves = await itemRepo.find({
            type: ItemTypeNames.LEAF
        });
        
        const randomBerry = randomizeInt(berries.length);
        const randomBerryAmount = randomizeInt(4, 1);
        const randomXP = randomizeInt(30, 20);

        const leafAvailable = randomizeInt(5);

        let randomLeaf: number;
        if (leafAvailable === 1) randomLeaf = randomizeInt(leaves.length);
        else randomLeaf = -1

        const berry = berries[randomBerry];
        const leaf = leaves[randomLeaf];

        const xp = await playerRepo.addXP(message.author.id, randomXP);
        await inventoryRepo.addItem(message.author.id, berry.name, randomBerryAmount);

        let messageText = "";
        let berryText = "y";
        let leafText = "!";

        if (berry.name === ItemNames.SUSBERRY) messageText = "I wouldn't recommend eating that though. That is, when you're able to eat it."
        if (randomBerryAmount > 1) berryText = "ies"
        if (leaf !== undefined) {
            await inventoryRepo.addItem(message.author.id, leaf.name, 1);
            leafText = `, and a ${leaf.name.toLowerCase()} dropped into your basket aswell!`
        }

        message.util.send(`You picked some berries from a nearby forest.\nYou found ${randomBerryAmount} ${berry.name.toLowerCase().slice(0, berry.name.length - 1)}${berryText}! ${messageText} You also earned ${randomXP}XP${leafText}`)

        const maxXP = calculateMaxXP(player.level);

        const response = checkIfLevelUp(xp, maxXP);
        if (response) {
            const level = await playerRepo.levelUp(message.author.id, xp)
            message.util.send(`LEVEL UP! You are now **Level ${level}**!`);
        }
        else message.util.send(`You have ${maxXP - xp}/${maxXP}XP left until **Level ${player.level + 1}**. `)
    }
}