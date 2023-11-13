import { Inject, Service } from "typedi";
import { PgConfig } from "../../conf/data/postgres.config";
import { EntityDB } from "../../../shared/constants/entitysDB/entitysDB";
import { User } from "../../../../domain/user/entity/user.entity";

@Service()
export class UserRepository {
  constructor(@Inject() private readonly database: PgConfig) {}

  async findByProp(prop: string, value: string | number) {
    return this.database.select(EntityDB.USER, {
      select: { userid: true, username: true, surname: true, password: true },
      where: {
        [prop]: value,
      },
    });
  }

  async update({userid, ...user}:User) {
    await this.database.update(EntityDB.USER, {
        data: user,
        where:{
            userid: userid
        }
    })
  }
}
