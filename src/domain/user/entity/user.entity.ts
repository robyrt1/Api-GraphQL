import { get } from "lodash";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  constructor(user: User){
    this.userid   = get(user,'userid', null);
    this.username = get(user,'username', null);
    this.password = get(user,'password', null);
    this.surname  = get(user,'surname', null);
  }
  @Field(tyoe => ID!)
  userid: number
  @Field()
  username: string;
  @Field()
  surname: string;
  @Field({ nullable: true })
  password: string;
} 