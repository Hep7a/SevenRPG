import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class MessageListener extends Listener {
    constructor() {
        super("message", {
            emitter: "client",
            event: "message",
            category: "client"
        });
    }

    exec(message: Message) {
        if (message.author.bot) return;
    }
}