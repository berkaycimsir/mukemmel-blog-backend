import Feed, { IFeed } from "../../../models/Feed";
import { IQueryType } from "../../../@types/ResolverTypes";
import User, { IUser } from "../../../models/User";

export const Feeds: IQueryType = {
  user: async (parent): Promise<IUser> => {
    return await User.findById(parent.user_id);
  },
  replies: async (parent): Promise<IFeed[]> => {
    return await Feed.find({ reply_id: parent.id });
  }
};
