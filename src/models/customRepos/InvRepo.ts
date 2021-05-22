import { EntityRepository, Repository } from "typeorm";
import { ItemNames } from "../../structures/Constants";
import { Inventories } from "../Inventories";
import { Item } from "../Items";
import { Player } from "../Players";

@EntityRepository(Inventories)
export class InventoryRepository extends Repository<Inventories> {
    async findOneByPlayer(playerID: string) {
        return await this.findOne({
            playerID: playerID
        });
    }

    async createInventory(playerID: string) {
        return this.insert({
            playerID: playerID,
        })
    }

    async addItem(player: string, item: string, amount: number) {
        const inventory = await this.findOne({
            playerID: player,
            item: item
        });
        
        if (!inventory) {
            return this.insert({
                playerID: player,
                item: item,
                amount: amount
            });
        } else {
            return this.update({
                playerID: player,
                item: item
            }, {
                amount: inventory.amount + amount
            });
        }
    }
}