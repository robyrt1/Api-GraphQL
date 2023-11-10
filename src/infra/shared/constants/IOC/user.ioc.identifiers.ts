export const USERS_IOC_IDS = {
    SERVICE: Symbol.for('UsersService'),
    REPOSITORY: Symbol.for('UsersRepository'),
    USECASE:{
        CREATE: Symbol.for('UsersCreateUseCase'),
        GETALL: Symbol.for('UsersGetAllUseCase'),
        FINDBYID: Symbol.for('findByIdUserUsecase'),
        UPDATE: Symbol.for('UsersUpdateUseCase'),
        PUTCH: Symbol.for('UsersParchUseCase')
    },
    FACTORY: Symbol.for('UsersFactory') 
  };