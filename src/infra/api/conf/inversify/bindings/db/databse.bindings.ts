import { IDatabase } from './../../../../../shared/interfaces/database.interface';
import { DATABASE_IOC_IDS } from './../../../../../shared/constants/database.ioc.identifiers';
import { Container } from "inversify";
import { PgConfig } from "../../../data/postgres.config";

export default (container: Container): Container => {
  container.bind<IDatabase>(DATABASE_IOC_IDS.DATABASE).toConstantValue(PgConfig.getInstance());
  
  return container;
};