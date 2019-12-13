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
