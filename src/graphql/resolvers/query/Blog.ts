import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";

export const Blog: IQueryType = {
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.owner_id);
  }
};
