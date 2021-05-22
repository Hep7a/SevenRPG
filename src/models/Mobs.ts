import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityNames } from "../structures/Constants";

@Entity(EntityNames.MOB)
export class Mobs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    xp: number;

    @Column()
    coins: number;

    @Column()
    icon: string;
}