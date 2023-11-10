import { Container } from 'inversify'
import { flow } from 'lodash'
import usersUsecasesBindings from './user.use.cases.bindings'

export default (container: Container): Container => 
    flow(usersUsecasesBindings)(container)