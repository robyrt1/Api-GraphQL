import { FindByIdUserUsecase } from '../../../../../../../use-case/user/findById/findById.use.case';
import { USERS_IOC_IDS } from '../../../../../../shared/constants/IOC/user.ioc.identifiers';
import { IUserResolver, UserResolver } from '../../../../../resolvers/user/user.resolver';
import { Container } from "inversify";
import { PgConfig } from '../../../../data/postgres.config';

export default (container: Container): Container => {
    // container.bind<IUserResolver>(USERS_IOC_IDS.RESOLVER).toConstantValue(new UserResolver(new FindByIdUserUsecase(PgConfig.getInstance())));
        return container;
}