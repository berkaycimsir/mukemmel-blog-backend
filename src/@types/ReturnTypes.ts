import { User, Blog, Comment, Feed } from "./DatabaseModelTypes";

type Token = {
  token: string;
};

export interface IUserQueryResolverReturnType {
  user: User;
  errorMessage: string;
}

export interface IUserMutationResolverReturnType {
  token: Token;
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

export interface IFeedResolverReturnType {
  feed: Feed;
  errorMessage: string;
}
