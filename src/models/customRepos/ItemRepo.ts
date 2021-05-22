import { EntityRepository, Repository } from "typeorm";
import { ItemNames, ItemTypeNames } from "../../structures/Constants";
import { Item } from "../Items";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
    insertItems() {
        this.insert([{
            name: ItemNames.WOOD,
            value: 0,
            type: ItemTypeNames.RESOURCE
        },
        {
            name: ItemNames.STONE,
            value: 0,
            type: ItemTypeNames.RESOURCE
        },
        {
            name: ItemNames.DIAMOND,
            value: 0,
            type: ItemTypeNames.RESOURCE
        }, 
        {
            name: ItemNames.BLUEBERRY,
            value: 0,
            type: ItemTypeNames.BERRY
        }, 
        {
            name: ItemNames.RASPBERRY,
            value: 0,
            type: ItemTypeNames.BERRY
        }, 
        {
            name: ItemNames.STRAWBERRY,
            value: 0,
            type: ItemTypeNames.BERRY
        }, 
        {
            name: ItemNames.SUSBERRY,
            value: 0,
            type: ItemTypeNames.BERRY
        }, 
        {
            name: ItemNames.BAY_LEAF,
            value: 0,
            type: ItemTypeNames.LEAF
        }, 
        {
            name: ItemNames.CURRY_LEAF,
            value: 0,
            type: ItemTypeNames.LEAF
        }, 
        {
            name: ItemNames.EUCALYPTUS_LEAF,
            value: 0,
            type: ItemTypeNames.LEAF
        },
        {
            name: ItemNames.YARROW_LEAF,
            value: 0,
            type: ItemTypeNames.LEAF
        }]);
    }

    async findOneByItem(item: string) {
        return this.findOne({
            name: item
        });
    }
}