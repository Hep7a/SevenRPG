import { EntityRepository, Repository } from "typeorm";
import { MobNames } from "../../structures/Constants";
import { randomizeInt } from "../../structures/Util";
import { Mobs } from "../Mobs";

@EntityRepository(Mobs)
export class MobRepository extends Repository<Mobs> {
    insertMobs() {
        this.insert([{
            name: MobNames.COW,
            xp: randomizeInt(5, 45),
            coins: randomizeInt(20, 80),
            damage: 0,
            icon: "🐮"
        },
        {
            name: MobNames.PIG,
            xp: randomizeInt(5, 30),
            coins: randomizeInt(15, 60),
            damage: 0,
            icon: "🐷"
        },
        {
            name: MobNames.CHICKEN,
            xp: randomizeInt(5, 10),
            coins: randomizeInt(10, 25),
            damage: 0,
            icon: "🐔"
        }])
    }
}
