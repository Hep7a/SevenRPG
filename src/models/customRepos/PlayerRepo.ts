import { EntityRepository, Repository } from "typeorm";
import { Player } from "../Players";

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
    async findOneByPlayer(playerID: string) {
        return await this.findOne({
            playerID: playerID
        });
    }

    async createPlayer(playerID: string) {
        return this.insert({
            playerID: playerID,
            coins: 0,
            xp: 0,
            totalXP: 0,
            level: 1
        });
    }

    async addCoins(playerEntity: Player, coins: number): Promise<number> {
        await this.update(playerEntity, {
            coins: playerEntity.coins + coins
        })

        return playerEntity.coins + coins;
    }

    async addXP(playerEntity: Player, xp: number): Promise<number> {
        await this.update(playerEntity, {
            xp: playerEntity.xp + xp,
        });

        return playerEntity.xp + xp
    }

    async levelUp(playerEntity: Player, level: number) {
        await this.update(playerEntity, {
            level: playerEntity.level + level,
        });

        return playerEntity.level + level;
    }

}