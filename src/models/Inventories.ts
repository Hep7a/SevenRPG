import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { EntityNames } from "../structures/Constants";
import { Item } from "./Items";
import { Player } from "./Players";

@Entity(EntityNames.INVENTORY)
export class Inventories {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    playerID: string

    @Column()
    item?: string

    @Column()
    amount?: number
}