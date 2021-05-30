const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(path.resolve(__dirname, "schema.graphql"), "utf-8");

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone`,
    // info: () => null,
    feed: (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        description: args.description,
        url: args.url,
      };
      const newLink = context.prisma.link.create({
        data: link,
      });
      return newLink;
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
    urlShort: (parent) => new URL(parent.url).hostname,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
