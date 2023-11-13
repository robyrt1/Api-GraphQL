import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UpdateUserArg{
    @Field({nullable: false})
    userid: number
    @Field({nullable: false})
    username: string
    @Field({nullable: false})
    surname: string
    @Field({nullable: true})
    password: string | null
}