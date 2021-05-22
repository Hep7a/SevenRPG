import { Message } from "discord.js";
import { MobRepository } from "../../models/customRepos/MobRepo";
import { PlayerRepository } from "../../models/customRepos/PlayerRepo";
import { CommandCategoryNames, NoPlayerMessage } from "../../structures/Constants";
import { FFCommand } from "../../structures/Structures";
import { calculateMaxXP, randomizeInt } from "../../structures/Util";

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
        const xp = await playerRepo.addXP(player, mob.xp);
        const coins = await playerRepo.addCoins(player, mob.coins);
        
        message.util.send(`You killed a ${mob.name.toLowerCase()} ${mob.icon}! You earned ${mob.coins} coins and ${mob.xp}XP!`);

        const maxXP = calculateMaxXP(player.level);

        if (xp >= maxXP) {
            const newPlayer = await playerRepo.findOneByPlayer(message.author.id);
            await playerRepo.update(newPlayer, {
                xp: xp - maxXP
            });
            const newerPlayer = await playerRepo.findOneByPlayer(message.author.id)
            const level = await playerRepo.levelUp(newerPlayer, 1)
            message.util.send(`LEVEL UP! You are now **Level ${level}**!`);
        }
        else message.util.send(`You have ${maxXP - xp}/${maxXP}XP left until **Level ${player.level + 1}**. `)
    }
}