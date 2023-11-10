import { USERS_IOC_IDS } from '../../../../../../shared/constants/IOC/user.ioc.identifiers';
import { IFindByIdUserUseCase, FindByIdUserUsecase } from './../../../../../../../use-case/user/findById/findById.use.case';
import { Container } from "inversify";

export default (container: Container): Container => {
    container.bind<IFindByIdUserUseCase>(USERS_IOC_IDS.USECASE.FINDBYID).to(FindByIdUserUsecase)
    return container;
}