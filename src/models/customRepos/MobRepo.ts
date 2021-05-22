import { EntityRepository, Repository } from "typeorm";
import { randomizeInt } from "../../structures/Util";
import { Mobs } from "../Mobs";

@EntityRepository(Mobs)
export class MobRepository extends Repository<Mobs> {
    insertMobs() {
        this.insert([{
            name: "Cow",
            xp: randomizeInt(5, 45),
            coins: randomizeInt(20, 80),
            icon: "🐮"
        },
        {
            name: "Pig",
            xp: randomizeInt(5, 30),
            coins: randomizeInt(15, 60),
            icon: "🐷"
        },
        {
            name: "Chicken",
            xp: randomizeInt(5, 10),
            coins: randomizeInt(10, 25),
            icon: "🐔"
        }])
    }
}
