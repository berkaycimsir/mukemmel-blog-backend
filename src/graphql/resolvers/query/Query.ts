import { IQueryType } from "../../../@types/ResolverTypes";
import {
  IUserResolverReturnType,
  IBlogResolverReturnType,
  ICommentResolverReturnType
} from "../../../@types/ReturnTypes";
import User, { IUser } from "../../../models/User";
import Blog, { IBlog } from "../../../models/Blog";
import Comment, { IComment } from "../../../models/Comment";

export const Query: IQueryType = {
  // user queries
  user: async (_, { id }): Promise<IUserResolverReturnType> => {
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
  }
};
