import BotClient from "./client/FFClient";
import { owners, token } from "./Config";

const client: BotClient = new BotClient({ token, owners });
client.start().catch(err => console.log(err))