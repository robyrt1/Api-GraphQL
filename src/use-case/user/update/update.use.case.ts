import { UserRepository } from "./../../../infra/api/repository/user/user.repository";
import { Inject, Service } from "typedi";
import { InputUpdateUserDto } from "./dtos/update.dto";
import { User } from "../../../domain/user/entity/user.entity";
import { defaultTo, head } from "lodash";

@Service()
export class UpdateUseUseCase {
  private _user: User;
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async execute(user: InputUpdateUserDto) {
    const shouldUser = await this.userRepository.findByProp("userid", user.userid);
    this._user = new User({
      userid: defaultTo(user.userid, shouldUser[0].userid),
      username: defaultTo(user.username, shouldUser[0].username),
      surname: defaultTo(user.surname, shouldUser[0].surname),
      password: defaultTo(user.password, shouldUser[0].password),
    });

    const shouldNotUser = !!head(shouldUser);
    if (!shouldNotUser)
      throw new Error(`User ${this._user.userid} does not exist`);

    console.log(this._user);
    await this.userRepository.update(this._user);
    return this._user;
  }
}
