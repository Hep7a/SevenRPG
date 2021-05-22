import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { CommandCategoryNames } from "../structures/Constants";
import { FFCommand } from "../structures/Structures";

export default class Help extends FFCommand {
    constructor() {
        super("help", {
            aliases: [
                "help",
                "cmds"
            ],
            category: CommandCategoryNames.OTHER,
            description: {
                content: "You seem stuck on what commands to try out. Let me offer some guidance!"
            },
            args: [
                {
                    id: "command",
                    type: "commandAlias"
                }
            ]
        });
    }

    exec(message: Message, { command }: { command: FFCommand }) {
        if (command) {
            return message.util.send(new MessageEmbed()
                .setAuthor(`${command.id.charAt(0).toUpperCase() + command.id.slice(1)}`, this.client.user.displayAvatarURL())
                .addField("**Description:**", command.description.content || "*No description provided.*")
                .addField("**Usage:**", command.description.usage || "*No usage provided.*")
                .addField("**Examples:**", command.description.examples ? command.description.examples.map((e: any) => `\`${e}\``).join("\n") : "No examples provided.")
            )
        }

        const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag} | Help`, this.client.user.displayAvatarURL())
            .setFooter(`${this.client.commandHandler.prefix}help [ command ] for info on a specific command.`)
            .setThumbnail(this.client.user.displayAvatarURL())

        for (const category of this.handler.categories.values()) {
            if (["default"].includes(category.id)) continue;

            embed.addField(category.id, category
                .filter(cmd => cmd.aliases.length > 0)
                .map(cmd => `\`${cmd}\``)
                .join(", ") || "*No commands found in this category.*"
            )
        }

        message.util.send(embed);
    }
}