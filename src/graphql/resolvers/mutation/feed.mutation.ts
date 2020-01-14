import { IFeedResolverReturnType } from "./../../../@types/ReturnTypes";
import { IMutationType } from "../../../@types/ResolverTypes";
import Feed, { IFeed } from "../../../models/Feed";

export const feedMutation: IMutationType = {
  addFeed: async (_, { data }): Promise<IFeedResolverReturnType> => {
    const {
      blog_id,
      user_id,
      content
    }: {
      blog_id?: string;
      user_id: string;
      content: string;
    } = data;

    if (content.length > 300) {
      return {
        feed: null,
        errorMessage: "Your content longer than 300 characters."
      };
    }

    const createdFeed = await Feed.create({
      blog_id,
      user_id,
      content,
      createdAt: new Date(Date.now())
    });

    return {
      feed: createdFeed,
      errorMessage: "No error."
    };
  },
  updateFeed: async (_, { data }): Promise<boolean> => {
    const { id, content }: { id: string; content: string } = data;

    const feed = await Feed.findById(id);

    if (!feed) {
      return false;
    }

    await Feed.findByIdAndUpdate(id, {
      content
    });

    return true;
  },
  deleteFeed: async (_, args): Promise<boolean> => {
    const { id }: { id: string } = args;

    const feed = await Feed.findById(id);

    if (!feed) {
      return false;
    }

    await Feed.deleteOne(feed);

    return true;
  },
  likeFeed: async (_, { id, isUnliking }): Promise<boolean> => {
    const feed: IFeed = await Feed.findById(id);

    if (!feed) {
      return false;
    }

    const feedLikes: number = feed.likes;
    let updatedFeedLike: number;

    if (isUnliking === false) {
      updatedFeedLike = feedLikes + 1;
    }

    if (isUnliking === true) {
      updatedFeedLike = feedLikes - 1;
    }

    await Feed.findByIdAndUpdate(id, {
      likes: updatedFeedLike
    });

    return true;
  }
};
