import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { PlayerRepository } from "../../models/customRepos/PlayerRepo";
import { NoPlayerMessage, WIPMessage } from "../../structures/Constants";
import { checkIfAbleToSeven } from "../../structures/game/Checks";
import { FFCommand } from "../../structures/Structures";

export default class Seven extends FFCommand {
    constructor() {
        super("seven", {
            aliases: [
                "seven",
                "destiny",
                "fate",
            ],
            ownerOnly: true
        });
    }

    async exec(message: Message) {
        const playerRepo = this.client.db.getCustomRepository(PlayerRepository);
        const player = await playerRepo.findOneByPlayer(message.author.id);

        if (!player) return message.util.send(NoPlayerMessage);

        const playerCheck = checkIfAbleToSeven(player.seven, player.level, player.coins);
        if (!playerCheck.response) return message.util.send(new MessageEmbed()
            .setDescription("You are not ready to face your Seven, child. Once you have reached these requirements, you will be ready to face your destiny.")
            .addField(`__**Requirements:**__`, `**Level:** ${playerCheck.requirements.level}\n**Coins:** ${playerCheck.requirements.coins}`)
        );

        message.util.send(playerCheck.requirements.level)
    }
}