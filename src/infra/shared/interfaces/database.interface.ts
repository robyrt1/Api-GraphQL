import { QueryResult } from "pg";

export interface IDatabase {
    execQuery(query: string, binds?: any[]): Promise<any[]>;
    execQuerySequence(table_name: string): Promise<QueryResult>;
    select(
      nameTable: string,
      columnsParam?: {
        select?: { [key: string]: boolean };
        where?: { [key: string]: string | number };
        orderBy?: { [key: string]: string };
      },
      schemaParam?: string
    ): Promise<any>;
    insert(
      nameTable: string,
      insertValues: { data: { [key: string]: any } },
      schemaParam?: string
    ): Promise<void>;
    update(
      nameTable: string,
      insertValues: {
        data: { [key: string]: any };
        where?: { [key: string]: string | number };
      },
      schemaParam?: string
    ): Promise<void>;
  }