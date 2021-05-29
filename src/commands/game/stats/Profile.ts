import { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { User } from "discord.js";
import { PlayerRepository } from "../../../models/customRepos/PlayerRepo";
import { CommandCategoryNames, NoPlayerMessage } from "../../../structures/Constants";
import { FFCommand } from "../../../structures/Structures";
import { calculateMaxHP, calculateMaxXP, calculateTotalXP } from "../../../structures/game/CalculateStats";

export default class Profile extends FFCommand {
    constructor() {
        super("profile", {
            aliases: [
                "profile",
                "level",
                "p"
            ],
            category: CommandCategoryNames.GAME,
            args: [
                {
                    id: "playerMentioned",
                    type: "user",
                }
            ]
        });
    }

    async exec(message: Message, { playerMentioned }: { playerMentioned: User }) {
        if (!playerMentioned) playerMentioned = message.author

        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(playerMentioned.id);

        if (!player) return message.util.send(NoPlayerMessage);

        message.util.send(new MessageEmbed()
            .setAuthor(`${playerMentioned.tag} | Profile`, `${playerMentioned.displayAvatarURL()}`)
            .addField("**PROGRESS:**", `**Coins:** ${player.coins}\n**Level:** ${player.level}\n**XP:** ${player.xp}/${calculateMaxXP(player.level)}`)
            .addField("**STATS:**", `**ATK:** ${player.atk}\n**DEF:** ${player.def}\n**HP:** ${player.hp}/${player.maxHP}`)
            .setThumbnail(this.client.user.displayAvatarURL())
        )
    }


}