import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";
import Blog, { IBlog } from "../../../models/Blog";
import Comment, { IComment } from "../../../models/Comment";
import {
  IBlogResolverReturnType,
  ICommentResolverReturnType,
  IUserQueryResolverReturnType
} from "../../../@types/ReturnTypes";

export const Query: IQueryType = {
  // user queries
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
  users: async (): Promise<IUser[]> => await User.find({}),
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
  blogs: async (): Promise<IBlog[]> => {
    const blogs = await Blog.find({});
    return blogs.sort(
      (a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );
  },
  getLastFourBlog: async (): Promise<IBlog[]> => {
    const allBlogs: IBlog[] = await Blog.find({});

    const sortedBlogs: IBlog[] = allBlogs.sort(
      (a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1
    );

    const blogs: IBlog[] = sortedBlogs.slice(0, 4);
    return blogs;
  },
  getTrendBlogs: async (): Promise<IBlog[]> => {
    const allBlogs: IBlog[] = await Blog.find({});

    const trendBlogs = allBlogs
      .filter(blog => blog.views > 20)
      .sort((a, b) => Number(a.views) > Number(b.views) && -1);

    return trendBlogs.slice(0, 5);
  },
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
  getBlogByCategory: async (_, args): Promise<IBlog[]> => {
    const { category }: { category: string } = args;

    const blogs: IBlog[] = await Blog.find({ category });

    return blogs;
  },

  // comment queries
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
  comments: async (_): Promise<IComment[]> => {
    const comments: IComment[] = await Comment.find({});
    const sortedComments: IComment[] = comments
      .sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1)
      .splice(0, 5);

    return sortedComments;
  },
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
  }
};
