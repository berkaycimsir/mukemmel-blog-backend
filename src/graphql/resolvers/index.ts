import { Feeds } from "./query/Feed";
import { User } from "./query/User";
import { Query } from "./query/Query";
import { Blog } from "./query/Blog";
import { Comment } from "./query/Comment";
import { Mutation } from "./mutation/index";

// all resolvers gathered in one object
const resolvers = {
  Query,
  Blog,
  User,
  Comment,
  Feed: Feeds,
  Mutation
};

// exports resolvers for use
export default resolvers;
