import { ApolloServer, gql } from "apollo-server";
import '../data/postgres.config';
import postgresConfig from "../data/postgres.config";
const typeDefs = gql`
  type Query {
    user(PersonCode: Int!): User!
  }

  type User {
    nm_pessoa_fisica: String!
    cd_pessoa_fisica: String!
    nr_cpf: String
  }
`;


function errorHandler(error) {
  return {
    path: error.path[0],
    code: error.extensions.code,
    status: false,
    message: error.message, // Use error.message para obter a mensagem do erro original
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      user: async (_, { PersonCode }) => {
        const result = await postgresConfig.select('ger_pessoa_fisica', {
          select: { nm_pessoa_fisica: true, cd_pessoa_fisica: true, nr_cpf: true },
          where: { cd_pessoa_fisica: PersonCode }
        });

        if (result.length === 0) {
          throw new Error(`User with PersonCode ${PersonCode} not found`);
        }

        const data = {
          nm_pessoa_fisica: result[0].nm_pessoa_fisica,
          cd_pessoa_fisica: result[0].cd_pessoa_fisica
        };
        return data;
      },
    },
  },
  formatError: errorHandler,
});

server.listen().then(({ url }) => {
  console.log("HTTP server running on ", url);
});
