import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";
import Comment, { IComment } from "../../../models/Comment";

export const Blog: IQueryType = {
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.owner_id);
  },
  comments: async (parent): Promise<IComment[]> => {
    const comments: IComment[] = await Comment.find({ blog_id: parent.id });

    const sortedComments = comments.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedComments;
  }
};
