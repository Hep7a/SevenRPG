import { Listener } from "discord-akairo";

export default class Ready extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
    }

    exec() {
        console.log("Food Fight online. Time to get messy.")
    }
}