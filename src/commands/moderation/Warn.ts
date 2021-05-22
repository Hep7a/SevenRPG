import { Message } from "discord.js";
import { GuildMember } from "discord.js";
import { WarnRepository } from "../../models/customRepos/WarnRepo";
import { Warns } from "../../models/Warns";
import { CommandCategoryNames } from "../../structures/Constants";
import { FFCommand } from "../../structures/Structures";

export default class Warn extends FFCommand {
    constructor() {
        super("warn", {
            aliases: [
                "warn"
            ],
            category: CommandCategoryNames.MODERATION,
            description: {
                content: "Aight man you gotta stop. ***warns user***"
            },
            args: [
                {
                    id: "member",
                    type: "member"
                },
                {
                    id: "reason",
                    type: "string",
                    default: "No reason provided."
                }
            ],
            userPermissions: [
                "MANAGE_MESSAGES"
            ]
        });
    }

    async exec(message: Message, { member, reason }: { member: GuildMember, reason: string }) {
        if (message.member.roles.highest.position >= member.roles.highest.position && message.author.id !== this.client.ownerID) return message.util.send("You cannot warn this member for this member is a higher status member than ye.")

        const warnRepo = this.client.db.getCustomRepository(WarnRepository);
        
        warnRepo.insert({
            guild: member.guild.id,
            member: member.id,
            moderator: message.author.id,
            reason: reason
        });

        message.util.send(`**${message.author.tag}** has warned <@!${member.id}> for: *${reason}*`)
        
    }
}