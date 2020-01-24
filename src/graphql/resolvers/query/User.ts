import Feed, { IFeed } from "./../../../models/Feed";
import { IQueryType } from "../../../@types/ResolverTypes";
import Blog, { IBlog } from "../../../models/Blog";
import Comment, { IComment } from "../../../models/Comment";

export const User: IQueryType = {
  comments: async (parent): Promise<IComment[]> => {
    const comments: IComment[] = await Comment.find({ user_id: parent.id });
    const sortedComments: IComment[] = comments.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedComments;
  },
  blogs: async (parent): Promise<IBlog[]> => {
    const blogs: IBlog[] = await Blog.find({ owner_id: parent.id });
    const sortedBlogs: IBlog[] = blogs.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedBlogs;
  },
  feeds: async (parent): Promise<IFeed[]> => {
    const feeds: IFeed[] = await Feed.find({ user_id: parent.id });
    const sortedFeeds: IFeed[] = feeds.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedFeeds;
  }
};
