import { commentMutation } from "./comment.mutation";
import { blogMutation } from "./blog.mutation";
import { userMutation } from "./user.mutation";

export const Mutation = {
  ...userMutation,
  ...blogMutation,
  ...commentMutation
};
