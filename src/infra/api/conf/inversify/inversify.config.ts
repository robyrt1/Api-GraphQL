import { Container } from 'inversify';
import { flow } from 'lodash';
import databaseBindings from './bindings/db/databse.bindings';
import usersBindings from './bindings/modules/user/user.bindings';


const container = flow(databaseBindings,usersBindings)(new Container());

export default container;