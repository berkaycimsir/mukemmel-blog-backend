import Feed, { IFeed } from "./../../../models/Feed";
import { IFeedResolverReturnType } from "./../../../@types/ReturnTypes";
import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";
import Blog, { IBlog } from "../../../models/Blog";
import Comment, { IComment } from "../../../models/Comment";
import {
  IBlogResolverReturnType,
  ICommentResolverReturnType,
  IUserQueryResolverReturnType
} from "../../../@types/ReturnTypes";

// export queries for use
export const Query: IQueryType = {
  // user queries
  // returns a user and error message by the given id
  user: async (_, { id }): Promise<IUserQueryResolverReturnType> => {
    const user: IUser = await User.findById(id);

    if (!user) {
      return {
        user: null,
        errorMessage: "User does not exists."
      };
    }

    return {
      user,
      errorMessage: "No error."
    };
  },
  // returns all users
  users: async (): Promise<IUser[]> => {
    const users: IUser[] = await User.find({});

    return users.sort((a: IUser, b: IUser) => {
      return Number(a.createdAt) - Number(b.createdAt) > 0 && -1;
    });
  },
  // returns a current active user
  activeUser: async (
    parent,
    args,
    { activeUser }
  ): Promise<IUserQueryResolverReturnType> => {
    if (!activeUser) {
      return {
        user: null,
        errorMessage: "No ActiveUser"
      };
    }

    return {
      user: await User.findOne({ username: activeUser.username }),
      errorMessage: "No error."
    };
  },

  // blog queries
  // returns a blog and error message by the given id
  blog: async (_, { id }): Promise<IBlogResolverReturnType> => {
    const blog: IBlog = await Blog.findById(id);

    if (!blog) {
      return {
        blog: null,
        errorMessage: "Blog does not exists."
      };
    }

    return {
      blog,
      errorMessage: "No error."
    };
  },
  // returns all user
  blogs: async (): Promise<IBlog[]> => {
    const blogs = await Blog.find({});
    return blogs.sort(
      (a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );
  },
  // Returns the last 4 blogs added to the database
  getLastFourBlog: async (): Promise<IBlog[]> => {
    const allBlogs: IBlog[] = await Blog.find({});

    const sortedBlogs: IBlog[] = allBlogs.sort(
      (a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    const blogs: IBlog[] = sortedBlogs.slice(0, 4);
    return blogs;
  },
  // returns trend blogs
  getTrendBlogs: async (): Promise<IBlog[]> => {
    const allBlogs: IBlog[] = await Blog.find({});

    const trendBlogs = allBlogs.sort(
      (a, b) => Number(a.views) > Number(b.views) && -1
    );

    return trendBlogs.slice(0, 4);
  },
  // returns most trend blog in database
  getMostTrendBlog: async (): Promise<IBlogResolverReturnType> => {
    const allBlogs: IBlog[] = await Blog.find({});

    const mostTrendBlogViews: number = Math.max.apply(
      Math,
      allBlogs.map(blog => blog.views)
    );

    const mostTrendBlog: IBlog = await Blog.findOne({
      views: mostTrendBlogViews
    });

    return {
      blog: mostTrendBlog,
      errorMessage: "No error."
    };
  },
  // returns blogs by the given category
  getBlogByCategory: async (_, args): Promise<IBlog[]> => {
    const { category }: { category: string } = args;

    const blogs: IBlog[] = await Blog.find({ category });

    blogs.sort((a, b) => Number(a.createdAt) > Number(b.createdAt) && -1);

    return blogs;
  },

  // comment queries
  // returns a comment and error message by the given id
  comment: async (_, { id }): Promise<ICommentResolverReturnType> => {
    const comment: IComment = await Comment.findById(id);

    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment does not exists."
      };
    }

    return {
      comment,
      errorMessage: "No error."
    };
  },
  // returns all comments
  comments: async (_): Promise<IComment[]> => {
    const comments: IComment[] = await Comment.find({});
    const sortedComments: IComment[] = comments
      .sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1)
      .splice(0, 5);

    return sortedComments;
  },
  // returns a comment and error message by the given user_id
  getCommentByUserId: async (
    parent,
    { user_id, blog_id }
  ): Promise<ICommentResolverReturnType> => {
    const comment: IComment = await Comment.findOne({ user_id, blog_id });

    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment not found."
      };
    }

    return {
      comment,
      errorMessage: "No error."
    };
  },

  // feed queries
  // returns a feed and errorMessage by the given id
  feed: async (parent, args): Promise<IFeedResolverReturnType> => {
    const { id }: { id: string } = args;

    const feed: IFeed = await Feed.findById(id);

    if (!feed) {
      return {
        feed: null,
        errorMessage: "Feed does not found."
      };
    }

    return {
      feed,
      errorMessage: "No error."
    };
  },
  // returns all feeds
  feeds: async (): Promise<IFeed[]> => {
    const feeds: IFeed[] = await Feed.find({});

    const sortedFeeds: IFeed[] = feeds.sort(
      (a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    return sortedFeeds;
  }
};
