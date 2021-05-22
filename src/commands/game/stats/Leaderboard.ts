import { User } from "discord.js";
import { GuildMember } from "discord.js";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { Any } from "typeorm";
import { PlayerRepository } from "../../../models/customRepos/PlayerRepo";
import { Player } from "../../../models/Players";
import { Warns } from "../../../models/Warns";
import { CommandCategoryNames } from "../../../structures/Constants";
import { FFCommand } from "../../../structures/Structures";

export default class Leaderboard extends FFCommand {
    constructor() {
        super("leaderboard", {
            aliases: [
                "leaderboard",
                "lb"
            ],
            category: CommandCategoryNames.GAME,
            args: [
                {
                    id: "page",
                    type: "number",
                    default: 1
                }
            ],
        });
    }

    async exec(message: Message, { page }: { page: number }) {
        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const playerEntities = await playerRepo.find({
            order: {
                level: "DESC"
            }
        });

        const players = await Promise.all(playerEntities.map(async (v: Player, i: number) => {
            const player: any = message.guild.members.cache.get(v.playerID) || "???"

            if (player === "???") {
                return {
                    pos: i + 1,
                    player: player,
                    xp: v.xp,
                    level: v.level
                }
            }
            else return {
                pos: i + 1,
                player: player.user.tag,
                xp: v.xp,
                level: v.level
            }
        }));

        message.util.send(new MessageEmbed()
            .setAuthor(`Top XP Players`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(players.map(x => `${x.pos}. **${x.player}:**  *${x.xp} XP* | **Level ${x.level}**`))
        );
    }
}