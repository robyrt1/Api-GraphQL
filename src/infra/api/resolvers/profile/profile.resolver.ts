import 'reflect-metadata'
import { Query, Resolver } from "type-graphql";
import { Inject, Service } from 'typedi';
import { FindAllProfileUseCase } from '../../../../use-case/profile/findAll/findAll.use.case';
import ErrorHandling from '../../../shared/exception/error.handler';
import { Profile } from '../../../../domain/profile/entity/profile.entity';

@Service()
@Resolver(Profile)
@ErrorHandling()
export class ProfileResolver {
    constructor(@Inject() private findAllProfileUseCase:FindAllProfileUseCase){}

    @Query(returns => [Profile])
    async Profiles() {
        try {
            const profiles = await this.findAllProfileUseCase.execute()
            return profiles;
        } catch (error) {
            return error
        }
    }
}