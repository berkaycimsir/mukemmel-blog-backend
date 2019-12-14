import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
// database connection function
import databaseConnection from "./helpers/db";
// graphql resolvers
import resolvers from "./graphql/resolvers/index";

// Database Models
import User from "./models/User";

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
  introspection: true,
  playground: true
});

app.use(cors());

// applying express server as a middleware to the apollo server
server.applyMiddleware({ app, path: "/graphql", cors: false });

// starting server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${process.env.PORT || 4000}`);
});
