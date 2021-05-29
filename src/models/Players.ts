import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { EntityNames } from "../structures/Constants";

@Entity(EntityNames.PLAYER)
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playerID: string;

    @Column()
    xp: number;

    @Column()
    level: number;

    @Column()
    coins: number;

    @Column()
    hp: number;

    @Column()
    maxHP: number;

    @Column()
    atk: number;

    @Column()
    def: number;

    @Column()
    seven: number;

    @Column()
    generation: number;
}