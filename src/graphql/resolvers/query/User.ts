import Feed, { IFeed } from "./../../../models/Feed";
import { IQueryType } from "../../../@types/ResolverTypes";
import Blog, { IBlog } from "../../../models/Blog";
import Comment, { IComment } from "../../../models/Comment";

// exports user queries for use
export const User: IQueryType = {
  // comments query for get comments of user
  comments: async (parent): Promise<IComment[]> => {
    const comments: IComment[] = await Comment.find({ user_id: parent.id });
    const sortedComments: IComment[] = comments.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedComments;
  },
  // blogs query for get blogs of user
  blogs: async (parent): Promise<IBlog[]> => {
    const blogs: IBlog[] = await Blog.find({ owner_id: parent.id });
    const sortedBlogs: IBlog[] = blogs.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedBlogs;
  },
  // feeds query for get feeds of user
  feeds: async (parent): Promise<IFeed[]> => {
    const feeds: IFeed[] = await Feed.find({ user_id: parent.id });
    const sortedFeeds: IFeed[] = feeds.sort(
      (a: any, b: any) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedFeeds;
  }
};
