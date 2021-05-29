import { EntityRepository, Repository } from "typeorm";
import { calculateMaxXP } from "../../structures/game/CalculateStats";
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
            level: 1,
            hp: 20,
            maxHP: 20,
            atk: 1,
            def: 1,
            seven: 1,
            generation: 1
        });
    }

    async addCoins(playerID: string, coins: number): Promise<number> {
        const player = await this.findOneByPlayer(playerID);

        await this.update(player, {
            coins: player.coins + coins
        })

        return player.coins + coins;
    }

    async addXP(playerID: string, xp: number): Promise<number> {
        const player = await this.findOneByPlayer(playerID);
        await this.update(player, {
            xp: player.xp + xp,
        });

        return player.xp + xp
    }

    async addLevel(playerID: string, level: number) {
        const player = await this.findOneByPlayer(playerID);
        await this.update(player, {
            level: player.level + level
        });

        return player.level + level
    }

    async levelUp(playerID: string, xp: number, level?: number) {
        if (!level) level = 1;
        const player = await this.findOneByPlayer(playerID);
        const maxXP = calculateMaxXP(player.level);

        await this.update(player, {
            xp: xp - maxXP
        });

        const newPlayer = await this.findOneByPlayer(playerID);

        await this.update(newPlayer, {
            hp: newPlayer.hp + 5,
            maxHP: newPlayer.maxHP + 5
        });

        const newerPlayer = await this.findOneByPlayer(playerID);

        await this.update(newerPlayer, {
            level: newerPlayer.level + level,
        });

        return player.level + level;
    }

    async takeDamage(playerID: string, hp: number) {
        const player = await this.findOneByPlayer(playerID);
        await this.update(player, {
            hp: player.hp - hp
        });

        return player.hp + hp
    }

}