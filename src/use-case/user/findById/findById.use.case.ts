import 'reflect-metadata'
import { Service, Container, Inject } from 'typedi';
import { Arg } from 'type-graphql';
import { PgConfig } from '../../../infra/api/conf/data/postgres.config';
import { EntityDB } from '../../../infra/shared/constants/entitysDB/entitysDB';
import { UserRepository } from '../../../infra/api/repository/user/user.repository';

@Service()
export class FindByIdUserUsecase implements IFindByIdUserUseCase {
  constructor(@Inject() private readonly userRepository: UserRepository) {}
  async execute(@Arg('id')id: number) {
    const shouldUsers = await this.userRepository.findByProp('userid', id);

    return shouldUsers[0];
  }
}

export interface IFindByIdUserUseCase {
  execute(id: number): Promise<any>;
}

