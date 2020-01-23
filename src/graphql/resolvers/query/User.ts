import Feed, { IFeed } from "./../../../models/Feed";
import { IQueryType } from "../../../@types/ResolverTypes";
import Blog, { IBlog } from "../../../models/Blog";
import Comment, { IComment } from "../../../models/Comment";

export const User: IQueryType = {
  comments: async (parent): Promise<IComment[]> => {
    return await Comment.find({ user_id: parent.id });
  },
  blogs: async (parent): Promise<IBlog[]> => {
    return await Blog.find({ owner_id: parent.id });
  },
  feeds: async (parent): Promise<IFeed[]> => {
    return await Feed.find({ user_id: parent.id });
  }
};
