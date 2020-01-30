import { User, Blog, Comment, Feed } from "./DatabaseModelTypes";

// typescript type for token
type Token = {
  token: string;
};

// typescript interface for query resolvers of user
export interface IUserQueryResolverReturnType {
  user: User;
  errorMessage: string;
}

// typescript interface for mutation resolvers of user
export interface IUserMutationResolverReturnType {
  token: Token;
  errorMessage: string;
}

// typescript interface for resolvers of blog
export interface IBlogResolverReturnType {
  blog: Blog;
  errorMessage: string;
}

// typescript interface for resolvers of comment
export interface ICommentResolverReturnType {
  comment: Comment;
  errorMessage: string;
}

// typescript interface for resolvers of feed
export interface IFeedResolverReturnType {
  feed: Feed;
  errorMessage: string;
}
