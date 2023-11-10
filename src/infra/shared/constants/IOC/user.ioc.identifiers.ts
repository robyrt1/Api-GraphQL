export const USERS_IOC_IDS = {
    RESOLVER: Symbol.for('UserResolver'),
    REPOSITORY: Symbol.for('UsersRepository'),
    USECASE:{
        CREATE: Symbol.for('UsersCreateUseCase'),
        GETALL: Symbol.for('UsersGetAllUseCase'),
        FINDBYID: Symbol.for('FindByIdUserUsecase'),
        UPDATE: Symbol.for('UsersUpdateUseCase'),
        PUTCH: Symbol.for('UsersParchUseCase')
    },
    FACTORY: Symbol.for('UsersFactory') 
  };