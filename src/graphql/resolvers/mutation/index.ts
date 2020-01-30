import { commentMutation } from "./comment.mutation";
import { blogMutation } from "./blog.mutation";
import { userMutation } from "./user.mutation";
import { feedMutation } from "./feed.mutation";

// all mutation resolvers gathered in one object
export const Mutation = {
  ...userMutation,
  ...blogMutation,
  ...commentMutation,
  ...feedMutation
};
