import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { formatError } from "../../shared/exception/format.execption";
import { Container } from "typedi";

import { PgConfig } from "../conf/data/postgres.config";
import { resolvers} from '../resolvers/index.resolver'
import { LoggingMiddleware } from "../middlewares/logging.middleware";

PgConfig.getInstance();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const schema = await buildSchema({
    container: Container,
    resolvers: resolvers as any,
    globalMiddlewares: [LoggingMiddleware],
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema,
    formatError,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap();
