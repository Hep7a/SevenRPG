import { Command, CommandOptions } from "discord-akairo";
import { User } from "discord.js";
import { Message } from "discord.js";
import { Player } from "../models/Players";

interface FFDescription {
    content?: string;
    usage?: string;
    examples?: string[];
}

export interface FFCommandOptions extends CommandOptions {
    description?: FFDescription;
}

export class FFCommand extends Command {
    constructor(id: string, options?: FFCommandOptions) {
        super(id, options);
    }
}

export interface DuelStats {
    damage: number;
    player: Player;
    user: User;
}