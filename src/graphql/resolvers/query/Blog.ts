import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";
import Comment, { IComment } from "../../../models/Comment";

// export queries of blog type for use
export const Blog: IQueryType = {
  // returns a user of blog
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.owner_id);
  },
  // returns a comments of blog
  comments: async (parent): Promise<IComment[]> => {
    const comments: IComment[] = await Comment.find({ blog_id: parent.id });

    // sorting comments by desc
    const sortedComments = comments.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedComments;
  }
};
