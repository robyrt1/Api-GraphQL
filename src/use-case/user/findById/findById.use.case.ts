import 'reflect-metadata'
import { inject, injectable } from "inversify";
import { USERS_IOC_IDS } from "../../../infra/shared/constants/IOC/user.ioc.identifiers";
import { IUserRepositoryInterface } from "../../../domain/user/repository/user.repository";
import { DATABASE_IOC_IDS } from "../../../infra/shared/constants/database.ioc.identifiers";
import { IDatabase } from "../../../infra/shared/interfaces/database.interface";
import { Service } from 'typedi';

@Service()
@injectable()
export class findByIdUserUsecase implements IFindByIdUserUseCase {
  constructor(@inject(DATABASE_IOC_IDS.DATABASE) private readonly database: IDatabase) {}
  async execute(id: number) {
    console.log("🚀 ~ file: findById.use.case.ts:12 ~ findByIdUserUsecase ~ execute ~ id:", id)
    const shouldUsers = await this.database.select("users", {
      select: { userid: true, username: true, surname: true, password: true },
      where: {
        userid: id,
      },
    });
    console.log("🚀 ~ file: findById.use.case.ts:18 ~ findByIdUserUsecase ~ execute ~ shouldUsers:", shouldUsers)

    return shouldUsers[0];
  }
}

export interface IFindByIdUserUseCase {
  execute(id: number): Promise<any>;
}
