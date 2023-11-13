import "reflect-metadata";
import { Args, Mutation, Query, Resolver } from "type-graphql";
import {
  FindByIdUserUsecase,
  IFindByIdUserUseCase,
} from "../../../../use-case/user/findById/findById.use.case";
import { User } from "../../../../domain/user/entity/user.entity";
import { head } from "lodash";
import { Inject, Service } from "typedi";
import { ParamUserById } from "./args-type/findById.arg.type";
import ErrorHandling from "../../../shared/exception/error.handler";
import { UpdateUseUseCase } from "../../../../use-case/user/update/update.use.case";
import { UpdateUserArg } from "./args-type/update.arg.ype";

@Service()
@Resolver(User)
@ErrorHandling()
export class UserResolver implements IUserResolver {
  constructor(
    @Inject()
    private findByIdUserUsecase: FindByIdUserUsecase,
    @Inject()
    private updateUseUseCase: UpdateUseUseCase
  ) {}

  @Query((returns) => User)
  async user(@Args() { id }: ParamUserById) {
    try {
      const user = await this.findByIdUserUsecase.execute(id);
      const notUser = !!head([user]);
      if (!notUser) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => User)
  async updateUser(@Args() user: UpdateUserArg) {
    try {
      return this.updateUseUseCase.execute(user);
    } catch (error) {
      throw error;
    }
  }
}

export interface IUserResolver {
  user(id: ParamUserById): Promise<any>;
}
