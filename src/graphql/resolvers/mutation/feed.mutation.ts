import { IFeedResolverReturnType } from "./../../../@types/ReturnTypes";
import { IMutationType } from "../../../@types/ResolverTypes";
import Feed, { IFeed } from "../../../models/Feed";

// exports mutations of feed for user
export const feedMutation: IMutationType = {
  // adding feed
  addFeed: async (_, { data }): Promise<IFeedResolverReturnType> => {
    const {
      blog_id,
      user_id,
      reply_id,
      content
    }: {
      blog_id?: string;
      user_id: string;
      reply_id?: string;
      content: string;
    } = data;

    // if lenght of content greater then 300 it will returns an error message
    if (content.length > 300) {
      return {
        feed: null,
        errorMessage: "Your content longer than 300 characters."
      };
    }

    // creating feed
    const createdFeed = await Feed.create({
      blog_id,
      user_id,
      reply_id,
      content,
      createdAt: new Date(Date.now())
    });

    // returns new feed data
    return {
      feed: createdFeed,
      errorMessage: "No error."
    };
  },
  // updating feed
  updateFeed: async (_, { data }): Promise<boolean> => {
    const { id, content }: { id: string; content: string } = data;

    // finding feed by the given id
    const feed = await Feed.findById(id);

    // if there is no feed
    if (!feed) {
      return false;
    }

    // updating feed by the new content that comes as a parameter
    await Feed.findByIdAndUpdate(id, {
      content
    });

    // returns success
    return true;
  },
  // deleting feed
  deleteFeed: async (_, args): Promise<boolean> => {
    const { id }: { id: string } = args;

    // finding feed by the given id
    const feed = await Feed.findById(id);

    // if there is no feed
    if (!feed) {
      return false;
    }

    // deleting replies of feed
    await Feed.deleteMany({ reply_id: id });
    // deleting feed
    await Feed.deleteOne(feed);

    // returns success
    return true;
  },
  // liking feed
  likeFeed: async (_, { id, isUnliking }): Promise<boolean> => {
    // finding feed by the given id
    const feed: IFeed = await Feed.findById(id);

    // if there is no feed
    if (!feed) {
      return false;
    }

    // getting likes of feed
    const feedLikes: number = feed.likes;
    let updatedFeedLike: number;

    // if user is liking
    if (isUnliking === false) {
      updatedFeedLike = feedLikes + 1;
    }

    // if user is unliking
    if (isUnliking === true) {
      updatedFeedLike = feedLikes - 1;
    }

    // updating user likes
    await Feed.findByIdAndUpdate(id, {
      likes: updatedFeedLike
    });

    // returns success
    return true;
  }
};
