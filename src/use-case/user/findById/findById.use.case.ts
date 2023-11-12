import 'reflect-metadata'
import { inject, injectable } from "inversify";
import { USERS_IOC_IDS } from "../../../infra/shared/constants/IOC/user.ioc.identifiers";
import { IUserRepositoryInterface } from "../../../domain/user/repository/user.repository";
import { DATABASE_IOC_IDS } from "../../../infra/shared/constants/database.ioc.identifiers";
import { IDatabase } from "../../../infra/shared/interfaces/database.interface";
import { Service, Container, Inject } from 'typedi';
import { Arg } from 'type-graphql';
import { PgConfig } from '../../../infra/api/conf/data/postgres.config';

@Service()
export class FindByIdUserUsecase implements IFindByIdUserUseCase {
  constructor(@Inject() private readonly database: PgConfig) {}
  async execute(@Arg('id')id: number) {
    const shouldUsers = await this.database.select("users", {
      select: { userid: true, username: true, surname: true, password: true },
      where: {
        userid: id,
      },
    });

    return shouldUsers[0];
  }
}

export interface IFindByIdUserUseCase {
  execute(id: number): Promise<any>;
}

