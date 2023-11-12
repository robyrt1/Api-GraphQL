import 'reflect-metadata'
import { Args, Query, Resolver } from "type-graphql";
import { FindByIdUserUsecase, IFindByIdUserUseCase } from "../../../../use-case/user/findById/findById.use.case";
import { User } from "../../../../domain/user/entity/user.entity";
import { head } from "lodash";
import { Inject, Service } from 'typedi';
import { ParamUserById } from './args-type/findById.arg.type';

@Service()
@Resolver(User)
export class UserResolver implements IUserResolver {
  constructor(
    @Inject()
    private findByIdUserUsecase: FindByIdUserUsecase
  ) {}

  @Query(returns => User)
  async user(@Args() {id}: ParamUserById) {
    try {
        const user = await this.findByIdUserUsecase.execute(id)
        const notUser = !!head([user]);
        if (!notUser) {
          throw new Error('id');
        }
    
        return user;
        
    } catch (error) {
        return error
    }
  }
}

export interface IUserResolver {
  user(id: ParamUserById): Promise<any>;
}
