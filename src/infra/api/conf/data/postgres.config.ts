import { HTTP_CODES } from "../../../shared/constants/http.codes";
import { Pool, PoolClient, QueryResult } from "pg";
import dotenv from "dotenv";
import { defaultTo, get, isNull, keys, size, values } from "lodash";
import { Service } from "typedi";
dotenv.config();

@Service()
export class PgConfig {
  private connection: Pool;
  private schema: string = "manager";

  private static _instance: PgConfig;

  private constructor() {
    this.connect();
  }

  public static getInstance(): PgConfig {
    if (!PgConfig._instance) PgConfig._instance = new PgConfig();
    return PgConfig._instance;
  }

  private connect() {
    if (!this.getConnection()) {
      const dbConfig = {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PG_PORT, 10),
        max: 10,
      };

      this.connection = new Pool(dbConfig);
      console.log("[INFO] - Database is connected");
    }
  }

  private getConnection(): Pool {
    return this.connection;
  }

  public async connectAsync() {
    if (!this.getConnection()) {
      const dbConfig = {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PG_PORT, 10),
      };

      try {
        this.connection = new Pool(dbConfig);
        await this.connection.connect();
        console.log("[INFO] - Database is connected");
      } catch (error) {
        console.error("Error connecting to the database:", error);
      }
    }
  }

  public async execQuery(query: string, binds?: any[]): Promise<any[]> {
    const client: PoolClient = await this.getConnection().connect();
    try {
      const { rows }: QueryResult = await client.query(query, binds);
      return rows;
    } catch (error) {
      console.log("🚀 ~ file: postgres.config.ts:70 ~ PgConfig ~ execQuery ~ error:", error)
      throw { statusCode: HTTP_CODES.INTERNAL_SERVER_ERROR, error };
    } finally {
      client.release();
    }
  }

  public async execQuerySequence(table_name: string): Promise<QueryResult> {
    const client: PoolClient = await this.getConnection().connect();
    try {
      const next_sequence = `select nextVal('manager.${table_name}_seq') as sequence`;
      const { rows }: QueryResult = await client.query(next_sequence);
      return rows[0].sequence;
    } catch (error) {
      throw { statusCode: HTTP_CODES.INTERNAL_SERVER_ERROR, error };
    } finally {
      client.release();
    }
  }

  private validateWhereConditions(where?: { [key: string]: string | number }): {
    whereClause: string;
    valueWhereClause: any[];
  } {
    let whereClause = "";
    let valueWhereClause = [];
    if (isNull(where)) return { whereClause, valueWhereClause };

    const whereKeys = keys(where);
    const whereArray = whereKeys.map((key, index) => `${key} = $${index + 1}`);
    whereClause = `WHERE ${whereArray.join(" AND ")}`;
    valueWhereClause = values(where);

    return { whereClause, valueWhereClause };
  }

  private validadeOrderByConditions(orderBy?: {
    [key: string]: string;
  }): string {
    let orderByClause = "";
    if (isNull(orderBy)) return orderByClause;

    const orderByKeys = keys(orderBy);
    const orderByArray = orderByKeys.map(
      (key, index) => `${key} ${orderBy[key]}`
    );
    orderByClause = `ORDER BY ${orderByArray.join(", ")}`;

    return orderByClause;
  }

  private aligningColumns(data?: { [key: string]: boolean | string | number }) {
    if (isNull(data)) return null;
    return keys(data).join(", ");
  }
  public async select(
    nameTable: string,
    columnsParam?: {
      select?: { [key: string]: boolean };
      where?: { [key: string]: string | number };
      orderBy?: { [key: string]: string };
    },
    schemaParam?: string
  ): Promise<any> {
    const columns = defaultTo(
      this.aligningColumns(get(columnsParam, "select", null)),
      "*"
    );
    const whereConditions = defaultTo(get(columnsParam, "where"), null);
    const schema = defaultTo(schemaParam, this.schema);
    const orderByConditions = get(columnsParam, "orderBy", null);

    const { whereClause, valueWhereClause } =
      this.validateWhereConditions(whereConditions);

    const orderByClause = this.validadeOrderByConditions(orderByConditions);

    const sql = `SELECT ${columns} FROM ${schema}.${nameTable} ${whereClause} ${orderByClause}`;

    try {
      const result = await this.execQuery(sql, valueWhereClause);
      return result;
    } catch (error) {
      throw new Error(`Erro ao executar a consulta: ${error.message}`);
    }
  }

  public async insert(
    nameTable: string,
    insertValues: { data: { [key: string]: any } },
    schemaParam?: string
  ): Promise<void> {
    const schema = defaultTo(schemaParam, this.schema);
    const columnsForInsertion = this.aligningColumns(insertValues.data);
    const whereKeys = keys(insertValues.data);
    const insertValuesArray = whereKeys
      .map((key, index) => `$${index + 1}`)
      .join(",");
    const data = values(insertValues.data);

    const sql = `INSERT INTO ${schema}.${nameTable} (${columnsForInsertion}) VALUES (${insertValuesArray})`;

    try {
      await this.execQuery(sql, data);
    } catch (error) {
      console.log("Erro insert: ", error);
      throw new Error(`Erro ao executar a consulta: ${error.message}`);
    }
  }

  private construirConsultaUpdate(dadosParaInserir) {
    const colunas = Object.keys(dadosParaInserir)
      .map((coluna, index) => `${coluna} = $${index + 1}`)
      .join(", ");
    const valores = Object.values(dadosParaInserir);

    return {
      colunas,
      valores,
    };
  }

  public async update(
    nameTable: string,
    insertValues: {
      data: { [key: string]: any };
      where?: { [key: string]: string | number };
    },
    schemaParam?: string
  ): Promise<void> {
    const schema = defaultTo(schemaParam, this.schema);
    const keyWhere = keys(insertValues.where);
    const { colunas, valores } = this.construirConsultaUpdate(
      insertValues.data
    );

    valores.push(insertValues.where[keyWhere as any]);

    const sql = `UPDATE ${schema}.${nameTable} SET ${colunas} where ${
      keyWhere[0]
    } = $${size(valores)} `;
    try {
      await this.execQuery(sql, valores);
    } catch (error) {
      throw new Error(`Erro ao executar a consulta: ${error.message}`);
    }
  }
}


