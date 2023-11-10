import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserResolver } from "../resolvers/user/user.resolver";
import container from "../conf/inversify/inversify.config";
import {formatError} from '../../shared/exception/format.execption';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const schema = await buildSchema({
    container: ({ context }) => {
      return container;
    },
    resolvers: [UserResolver],
    // container:Container,
    emitSchemaFile: true,
  });
  const server = new ApolloServer({
    schema,
    formatError
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap();
