import { IMutationType } from "../../../@types/ResolverTypes";
import { ICommentResolverReturnType } from "../../../@types/ReturnTypes";
import Comment, { IComment } from "../../../models/Comment";

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

    const comment = await Comment.findOne({ title });

    if (comment) {
      return {
        comment: null,
        errorMessage: "Comment title exists."
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
  }
};
