import { ICommentResolverReturnType } from "./../../../@types/ReturnTypes";
import { IMutationType } from "../../../@types/ResolverTypes";
import Comment, { IComment } from "../../../models/Comment";

export const commentMutation: IMutationType = {
  createComment: async (_, { data }): Promise<ICommentResolverReturnType> => {
    const {
      blog_id,
      user_id,
      content
    }: {
      blog_id: string;
      user_id: string;
      content: string;
    } = data;

    const comment = await Comment.findOne({ user_id, blog_id });

    if (comment) {
      return {
        comment: null,
        errorMessage: "This user already has comment."
      };
    }

    if (content.length > 100) {
      return {
        comment: null,
        errorMessage: "Your content longer than 100 characters."
      };
    }

    const createdComment = await Comment.create({
      blog_id,
      user_id,
      content,
      createdAt: new Date(Date.now())
    });

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

    await Comment.remove(comment);

    return {
      comment: null,
      errorMessage: "No error."
    };
  },
  updateComment: async (_, { data }): Promise<ICommentResolverReturnType> => {
    const { id, content }: { id: string; content: string } = data;

    const comment = await Comment.findById(id);

    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment does not found."
      };
    }

    return {
      comment: await Comment.findByIdAndUpdate(id, {
        content
      }),
      errorMessage: "No error."
    };
  },
  likeComment: async (
    _,
    { id, isUnliking }
  ): Promise<ICommentResolverReturnType> => {
    const comment = await Comment.findById(id);

    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment not found."
      };
    }

    const commentLikes = comment.likes;
    let updatedCommentLike: number;

    if (isUnliking === false) {
      updatedCommentLike = commentLikes + 1;
    }

    if (isUnliking === true) {
      updatedCommentLike = commentLikes - 1;
    }

    return {
      comment: await Comment.findByIdAndUpdate(id, {
        likes: updatedCommentLike
      }),
      errorMessage: "No error."
    };
  }
};
