export const USERS_IOC_IDS = {
    RESOLVER: Symbol.for('UserResolver'),
    REPOSITORY: Symbol.for('UsersRepository'),
    USECASE:{
        FINDBYID: Symbol.for('FindByIdUserUsecase'),
    },
    FACTORY: Symbol.for('UsersFactory') 
  };