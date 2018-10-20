import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";
import { gql } from "apollo-server-express";

const allTypes: any[] = fileLoader(path.join(__dirname, "./api/**/*.graphql"));

const allResolvers: any[] = fileLoader(
  // resolvers.*인 이유는 resolvers.ts || resolvers.js이기 때문!
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = {
  typeDefs: gql`
    ${mergedTypes}
  `,
  resolvers: mergedResolvers
};

export default schema;
