import { Inject, Service } from "typedi";
import { PgConfig } from "../../../infra/api/conf/data/postgres.config";
import { EntityDB } from "../../../infra/shared/constants/entitysDB/entitysDB";

@Service()
export class FindAllProfileUseCase {
  constructor(@Inject() private readonly database: PgConfig) {}

  async execute() {
    const shouldProfiles = await this.database.select(
      EntityDB.SYSTEMUSERPROFILES
    );

    return shouldProfiles;
  }
}
