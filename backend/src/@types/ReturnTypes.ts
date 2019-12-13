import { User } from "./DatabaseModelTypes";

export interface IUserResolverReturnType {
  user: User;
  errorMessage: string;
}
