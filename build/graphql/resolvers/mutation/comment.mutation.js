"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentMutation = void 0;
const Comment_1 = __importDefault(require("../../../models/Comment"));
// exports mutations of comment type for use
exports.commentMutation = {
    // creating comment
    createComment: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { blog_id, user_id, content } = data;
        // if there is a comment with a user_id and blog_id that comes as a parameter
        const comment = yield Comment_1.default.findOne({ user_id, blog_id });
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
        const createdComment = yield Comment_1.default.create({
            blog_id,
            user_id,
            likes: 0,
            content,
            createdAt: new Date(Date.now())
        });
        // returns new comment data
        return {
            comment: createdComment,
            errorMessage: "No error."
        };
    }),
    // deleting comment
    deleteComment: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        // finding a comment by the given id
        const comment = yield Comment_1.default.findById(id);
        // if there is no comment
        if (!comment) {
            return {
                comment: null,
                errorMessage: "Comment does not found"
            };
        }
        // deleting comment
        yield Comment_1.default.deleteOne(comment);
        return {
            comment: null,
            errorMessage: "No error."
        };
    }),
    // updating comment
    updateComment: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, content } = data;
        // finding a comment by the given id
        const comment = yield Comment_1.default.findById(id);
        // if there is no comment
        if (!comment) {
            return {
                comment: null,
                errorMessage: "Comment does not found."
            };
        }
        // updating comment
        return {
            comment: yield Comment_1.default.findByIdAndUpdate(id, {
                content
            }),
            errorMessage: "No error."
        };
    }),
    // liking comment
    likeComment: (_, { id, isUnliking }) => __awaiter(void 0, void 0, void 0, function* () {
        // finding comment by the given id
        const comment = yield Comment_1.default.findById(id);
        // if there is no comment
        if (!comment) {
            return {
                comment: null,
                errorMessage: "Comment not found."
            };
        }
        // getting likes of comment
        const commentLikes = comment.likes;
        let updatedCommentLike;
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
            comment: yield Comment_1.default.findByIdAndUpdate(id, {
                likes: updatedCommentLike
            }),
            errorMessage: "No error."
        };
    })
};
//# sourceMappingURL=comment.mutation.js.map