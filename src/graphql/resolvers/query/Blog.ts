import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";
import Comment, { IComment } from "../../../models/Comment";

export const Blog: IQueryType = {
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.owner_id);
  },
  comments: async (parent): Promise<IComment[]> => {
    return await Comment.find({ blog_id: parent.id });
  }
};
