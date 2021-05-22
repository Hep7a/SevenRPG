import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityNames } from "../structures/Constants";

@Entity(EntityNames.WARN)
export class Warns {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guild!: string;

    @Column()
    member!: string;

    @Column()
    moderator!: string;

    @Column()
    reason!: string;
}