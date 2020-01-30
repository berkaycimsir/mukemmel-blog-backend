import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as jwt from "jsonwebtoken";
// database connection function
import databaseConnection from "./helpers/db";
// graphql resolvers
import resolvers from "./graphql/resolvers/index";

// dotenv setup
dotenv.config();

// express app
const app: Application = express();

// database connection
databaseConnection({ db: process.env.DB_URI });

// graphql type definition
const typeDefs: string = importSchema("src/graphql/schema.graphql");
// make schema that includes our resolvers and typeDefs
const schema: GraphQLSchema = makeExecutableSchema({ typeDefs, resolvers });

// apollo server
const server: ApolloServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    activeUser: req ? req.headers.activeUser : null
  }),
  introspection: true,
  playground: true
});

// authorization middleware
app.use((req, res, next) => {
  const { authorization } = req.headers;
  const token: any = authorization;

  if (token && token !== "null") {
    try {
      const activeUser: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.headers.activeUser = activeUser;
    } catch (error) {
      console.error(error);
    }
  }

  next();
});

// applying express server as a middleware to the apollo server
server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    origin: true,
    credentials: true
  }
});

// starting server on port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started onn port ${process.env.PORT || 4000}`);
});
