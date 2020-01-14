import { commentMutation } from "./comment.mutation";
import { blogMutation } from "./blog.mutation";
import { userMutation } from "./user.mutation";
import { feedMutation } from "./feed.mutation";

export const Mutation = {
  ...userMutation,
  ...blogMutation,
  ...commentMutation,
  ...feedMutation
};
