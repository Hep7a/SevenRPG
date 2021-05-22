import { EntityRepository, Repository } from "typeorm";
import { Warns } from "../Warns";

@EntityRepository(Warns)
export class WarnRepository extends Repository<Warns> {
    async findByMember(memberID: string) {
        return await this.find({
            member: memberID
        });
    }

    async findByModerator(moderatorID: string) {
        return await this.find({
            moderator: moderatorID
        });
    }
}