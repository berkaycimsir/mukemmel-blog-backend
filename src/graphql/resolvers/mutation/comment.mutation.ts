import { ICommentResolverReturnType } from "./../../../@types/ReturnTypes";
import { IMutationType } from "../../../@types/ResolverTypes";
import Comment, { IComment } from "../../../models/Comment";

// exports mutations of comment type for use
export const commentMutation: IMutationType = {
  // creating comment
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

    // if there is a comment with a user_id and blog_id that comes as a parameter
    const comment = await Comment.findOne({ user_id, blog_id });

    if (comment) {
      return {
        comment: null,
        errorMessage: "This user already has comment."
      };
    }

    // if lenght of content greater then 100
    if (content.length > 100) {
      return {
        comment: null,
        errorMessage: "Your content longer than 100 characters."
      };
    }

    // creating comment
    const createdComment = await Comment.create({
      blog_id,
      user_id,
      content,
      createdAt: new Date(Date.now())
    });

    // returns new comment data
    return {
      comment: createdComment,
      errorMessage: "No error."
    };
  },
  // deleting comment
  deleteComment: async (_, { id }): Promise<ICommentResolverReturnType> => {
    // finding a comment by the given id
    const comment: IComment = await Comment.findById(id);

    // if there is no comment
    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment does not found"
      };
    }

    // deleting comment
    await Comment.deleteOne(comment);

    return {
      comment: null,
      errorMessage: "No error."
    };
  },
  // updating comment
  updateComment: async (_, { data }): Promise<ICommentResolverReturnType> => {
    const { id, content }: { id: string; content: string } = data;

    // finding a comment by the given id
    const comment = await Comment.findById(id);

    // if there is no comment
    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment does not found."
      };
    }

    // updating comment
    return {
      comment: await Comment.findByIdAndUpdate(id, {
        content
      }),
      errorMessage: "No error."
    };
  },
  // liking comment
  likeComment: async (
    _,
    { id, isUnliking }
  ): Promise<ICommentResolverReturnType> => {
    // finding comment by the given id
    const comment = await Comment.findById(id);

    // if there is no comment
    if (!comment) {
      return {
        comment: null,
        errorMessage: "Comment not found."
      };
    }

    // getting likes of comment
    const commentLikes = comment.likes;
    let updatedCommentLike: number;

    // if user is liking comment
    if (isUnliking === false) {
      updatedCommentLike = commentLikes + 1;
    }

    // if user is unliking comment
    if (isUnliking === true) {
      updatedCommentLike = commentLikes - 1;
    }

    // updating user likes
    return {
      comment: await Comment.findByIdAndUpdate(id, {
        likes: updatedCommentLike
      }),
      errorMessage: "No error."
    };
  }
};
