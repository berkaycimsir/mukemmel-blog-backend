import { User, Blog } from "./DatabaseModelTypes";

export interface IUserResolverReturnType {
  user: User;
  errorMessage: string;
}

export interface IBlogResolverReturnType {
  blog: Blog;
  errorMessage: string;
}
