import 'reflect-metadata'
import { Service, Container, Inject } from 'typedi';
import { Arg } from 'type-graphql';
import { PgConfig } from '../../../infra/api/conf/data/postgres.config';
import { EntityDB } from '../../../infra/shared/constants/entitysDB/entitysDB';

@Service()
export class FindByIdUserUsecase implements IFindByIdUserUseCase {
  constructor(@Inject() private readonly database: PgConfig) {}
  async execute(@Arg('id')id: number) {
    const shouldUsers = await this.database.select(EntityDB.USER, {
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

