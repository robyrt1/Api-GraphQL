import 'reflect-metadata'
import { inject } from "inversify";
import { Arg, Query, Resolver } from "type-graphql";
import { USERS_IOC_IDS } from "../../../shared/constants/IOC/user.ioc.identifiers";
import { IFindByIdUserUseCase } from "../../../../use-case/user/findById/findById.use.case";
import { User } from "../../../../domain/user/entity/user.entity";
import { head } from "lodash";
import { Inject, Service } from 'typedi';
@Service()
@Resolver(User)
export class UserService {
  constructor(
    // @inject(USERS_IOC_IDS.USECASE.FINDBYID)
    @Inject('findByIdUserUsecase')
    private findByIdUserUsecase: IFindByIdUserUseCase
  ) {}

  @Query(returns => User)
  async user(@Arg("id", {nullable: false}) id: number) {
    try {
        console.log(
          "🚀 ~ file: user.resolver.ts:13 ~ UserService ~ user ~ id:",
          id
        );

        const user = await this.findByIdUserUsecase.execute(id);
        const notUser = !!head(user);
        if (!notUser) {
          throw new Error('id');
        }
    
        return user;
        
    } catch (error) {
        console.log("🚀 ~ file: user.resolver.ts:31 ~ UserService ~ user ~ error:", error)
        return error
    }
  }
}
