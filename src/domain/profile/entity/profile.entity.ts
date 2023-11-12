import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()

export class Profile {
    @Field(type => ID)
    id:number;

    @Field(type => String)
    profiledescription:string;
}