import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";

export const Feed: IQueryType = {
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.user_id);
  }
};
