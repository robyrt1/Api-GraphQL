import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class ParamUserById{
    @Field({nullable: false})
    id: number
}