import { User } from "./query/User";
import { Query } from "./query/Query";
import { Blog } from "./query/Blog";
import { Mutation } from "./mutation/index";

const resolvers = {
  Query,
  Blog,
  User,
  Mutation
};

export default resolvers;
