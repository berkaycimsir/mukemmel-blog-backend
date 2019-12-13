import { IQueryType } from "../../../@types/ResolverTypes";
import Blog, { IBlog } from "../../../models/Blog";
import User, { IUser } from "../../../models/User";

export const Comment: IQueryType = {
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.user_id);
  },
  blog: async (parent): Promise<IBlog> => {
    return await Blog.findById(parent.blog_id);
  }
};
