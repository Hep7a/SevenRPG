import { Message } from "discord.js";
import { CollectorFilter } from "discord.js";
import { User } from "discord.js";
import { PlayerRepository } from "../../models/customRepos/PlayerRepo";
import { CommandCategoryNames, NoPlayerMessage } from "../../structures/Constants";
import { DuelStats, FFCommand } from "../../structures/Structures";
import { calculateMaxXP, checkIfLevelUp, randomizeInt } from "../../structures/Util";

export default class Duel extends FFCommand {
    constructor() {
        super("duel", {
            aliases: [
                "duel"
            ],
            category: CommandCategoryNames.GAME,
            args: [
                {
                    id: "opponent",
                    type: "user"
                }
            ]
        });
    }

    async exec(message: Message, { opponent }: { opponent: User }) {
        if (!opponent) return message.util.send("You need to specify a player.")
        if (opponent === message.author) return message.util.send("No need to fight yourself man, you're a good person.");

        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);

        const playerEntity = await playerRepo.findOneByPlayer(message.author.id);
        const opponentEntity = await playerRepo.findOneByPlayer(opponent.id);

        if (!playerEntity) return message.util.send(NoPlayerMessage);

        let battleCommence: boolean

        const filter: CollectorFilter = (msg: Message) => { return (msg.content === "y" || "n") && (msg.author.id === opponent.id) }
        const collector = message.channel.createMessageCollector(filter, {
            time: 30000,
            max: 1
        });
        message.channel.send(`<@!${opponent.id}>, <@!${message.author.id}> has challenged you to a duel! Do you accept? \`y\`/\`n\``);

        collector.on('collect', async (m: Message) => {
            switch(m.content) {
                case "y":
                    message.util.send(`<@!${m.author.id}> wants to fight! Starting duel...`);
                    battleCommence = true;

                    const playerStats: DuelStats = {
                        damage: randomizeInt(100, 50),
                        player: playerEntity,
                        user: message.author
                    }
                    const opponentStats: DuelStats = {
                        damage: randomizeInt(100, 50),
                        player: opponentEntity,
                        user: opponent
                    }

                    const stats = [ playerStats, opponentStats ]

                    const sortedStats = stats.sort((a, b) => b.damage - a.damage);

                    const winner = sortedStats[0];

                    message.util.send(`The winner is <@!${winner.user.id}>!`);
                    message.util.send(sortedStats.map(x => `**${x.user.username}:** :heart: *${x.damage}*`));
                    
                    const winnerCoins = winner.damage * 2.5;
                    const winnerXP = winner.damage * 1.5;

                    const coins = await playerRepo.addCoins(message.author.id, winnerCoins);
                    const xp = await playerRepo.addXP(message.author.id, winnerXP);

                    message.util.send(`${winner.user.username} has earnt ${winnerCoins} and ${winnerXP}!`);

                    const maxXP = calculateMaxXP(playerEntity.level);

                    const response = checkIfLevelUp(xp, maxXP);
                    if (response) {
                        const level = await playerRepo.levelUp(message.author.id, xp)
                        message.util.send(`LEVEL UP! ${winner.user.username} is now **Level ${level}**!`);
                    }
                    else message.util.send(`${winner.user.username} has ${maxXP - xp}/${maxXP}XP left until **Level ${playerEntity.level + 1}**. `)

                break;

                case "n":
                    message.util.send(`<@!${m.author.id}> declined your duel.`);
                    battleCommence = false;
                    break;
            }
        });

        collector.on('end', () => {
            message.util.send(`Message collector has ended.`)
        });
    } 
}