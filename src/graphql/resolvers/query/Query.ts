import { IQueryType } from "../../../@types/ResolverTypes";
import { IUserResolverReturnType } from "../../../@types/ReturnTypes";
import User, { IUser } from "../../../models/User";

export const Query: IQueryType = {
  hello: () => "Hello",
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
  users: async (): Promise<IUser[]> => await User.find({})
};
