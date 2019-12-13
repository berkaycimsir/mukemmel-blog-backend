import { User, Blog, Comment } from "./DatabaseModelTypes";

export interface IUserResolverReturnType {
  user: User;
  errorMessage: string;
}

export interface IBlogResolverReturnType {
  blog: Blog;
  errorMessage: string;
}

export interface ICommentResolverReturnType {
  comment: Comment;
  errorMessage: string;
}
