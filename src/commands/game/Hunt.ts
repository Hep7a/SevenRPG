import { Message } from "discord.js";
import { MobRepository } from "../../models/customRepos/MobRepo";
import { PlayerRepository } from "../../models/customRepos/PlayerRepo";
import { CommandCategoryNames, NoPlayerMessage } from "../../structures/Constants";
import { FFCommand } from "../../structures/Structures";
import { calculateMaxXP, checkIfLevelUp, randomizeInt } from "../../structures/Util";

export default class Hunt extends FFCommand {
    constructor() {
        super("hunt", {
            aliases: [
                "hunt"
            ],
            category: CommandCategoryNames.GAME
        });
    }

    async exec(message: Message) {
        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(message.author.id);

        if (!player) return message.reply(NoPlayerMessage);

        const mobRepo = this.client.db.getCustomRepository(MobRepository);
        const mobs = await mobRepo.find();

        const randomMob = randomizeInt(mobs.length);

        const mob = mobs[randomMob];
        const xp = await playerRepo.addXP(message.author.id, mob.xp);
        const coins = await playerRepo.addCoins(message.author.id, mob.coins);
        
        message.util.send(`You killed a ${mob.name.toLowerCase()} ${mob.icon}! You earned ${mob.coins} coins and ${mob.xp}XP!`);

        const maxXP = calculateMaxXP(player.level);

        const response = checkIfLevelUp(xp, maxXP);

        if (response) {
            const level = await playerRepo.levelUp(message.author.id, xp)
            message.util.send(`LEVEL UP! You are now **Level ${level}**!`);
        }
        else message.util.send(`You have ${maxXP - xp}/${maxXP}XP left until **Level ${player.level + 1}**. `)
    }
}