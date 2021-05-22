import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityNames } from "../structures/Constants";
import { Inventories } from "./Inventories";

@Entity(EntityNames.ITEM)
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: number;
    
    @Column()
    type: string;
}