import { ConnectionManager } from "typeorm";
import { dbName } from "../Config";
import { Inventories } from "../models/Inventories";
import { Item } from "../models/Items";
import { Mobs } from "../models/Mobs";
import { Player } from "../models/Players";
import { Warns } from "../models/Warns";

const connectionManager = new ConnectionManager();
connectionManager.create({
    name: dbName,
    type: "sqlite",
    database: "./db.sqlite",
    entities: [
        Warns,
        Player,
        Mobs,
        Item,
        Inventories
    ]
});

export default connectionManager;