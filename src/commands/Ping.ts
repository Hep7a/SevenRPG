import { Message } from "discord.js";
import { CommandCategoryNames } from "../structures/Constants";
import { FFCommand } from "../structures/Structures";


export default class Ping extends FFCommand {
    constructor() {
        super("ping", {
            aliases: [
                "ping"
            ],
            category: CommandCategoryNames.OTHER,
            description: {
                content: "How fast is Discord running right now?"
            }
        });
    }

    exec(message: Message) {
        message.util.send(`Pong! \`${this.client.ws.ping}ms\``)
    }
}