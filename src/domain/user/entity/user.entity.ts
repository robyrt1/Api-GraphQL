import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(tyoe => ID!)
  userid: number
  @Field()
  username: string;
  @Field()
  surname: string;
  @Field({ nullable: true })
  password: string;
}