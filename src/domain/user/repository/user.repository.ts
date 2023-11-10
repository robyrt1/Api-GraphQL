import { RepositoryInterface } from './../../shared/repository/repository.interface';
import { User } from './../entity/user.entity';

export interface IUserRepositoryInterface
  extends Partial<RepositoryInterface<User>> {
    findById(id:number):Promise<User>
    
  }