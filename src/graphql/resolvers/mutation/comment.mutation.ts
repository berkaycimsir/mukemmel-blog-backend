import { IMutationType } from "../../../@types/ResolverTypes";
import { ICommentResolverReturnType } from "../../../@types/ReturnTypes";
import Comment, { IComment } from "../../../models/Comment";
import User from "../../../models/User";

export const commentMutation: IMutationType = {
  createComment: async (_, { data }): Promise<ICommentResolverReturnType> => {
    const {
      blog_id,
      user_id,
      title,
      content
    }: {
      blog_id: string;
      user_id: string;
      title: string;
      content: string;
    } = data;

    const comment = await Comment.findOne({ user_id });

    if (comment) {
      return {
        comment: null,
        errorMessage: "This user already has comment."
      };
    }

    if (title.length > 20) {
      return {
        comment: null,
        errorMessage: "Your title longer than 20 characters."
      };
    }

    if (content.length > 100) {
      return {
        comment: null,
        errorMessage: "Your content longer than 100 characters."
      };
    }

    await Comment.create({
      blog_id,
      user_id,
      title,
      content,
      createdAt: new Date(Date.now())
    });

    const createdComment: IComment = await Comment.findOne({ title });

    return {
      comment: createdComment,
      errorMessage: "No error."
    };
  },
  deleteComment: async (_, { id }): Promise<ICommentResolverReturnType> => {
    const comment: IComment = await Comment.findById(id);

    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment does not found"
      };
    }

    await Comment.deleteOne(comment);

    return {
      comment: null,
      errorMessage: "No error."
    };
  }
};
