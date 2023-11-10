import "reflect-metadata";
import { ResolverData, buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserService } from "../resolvers/user/user.resolver";
import container from "../conf/inversify/inversify.config";
import {formatError} from '../../shared/exception/format.execption';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserService],
    container: ({ context }) => {
      return container;
    },
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
