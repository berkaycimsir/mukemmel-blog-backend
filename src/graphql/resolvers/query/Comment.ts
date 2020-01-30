import { IQueryType } from "../../../@types/ResolverTypes";
import Blog, { IBlog } from "../../../models/Blog";
import User, { IUser } from "../../../models/User";

// exports queries of comment type for use
export const Comment: IQueryType = {
  // returns a user of comment
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.user_id);
  },
  // returns a blog of comment
  blog: async (parent): Promise<IBlog> => {
    return await Blog.findById(parent.blog_id);
  }
};
