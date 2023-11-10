import { USERS_IOC_IDS } from '../../../../../../shared/constants/IOC/user.ioc.identifiers';
import { IUserResolver, UserResolver } from '../../../../../resolvers/user/user.resolver';
import { Container } from "inversify";

export default (container: Container): Container => {
    container.bind<IUserResolver>(USERS_IOC_IDS.RESOLVER).to(UserResolver)
    return container;
}