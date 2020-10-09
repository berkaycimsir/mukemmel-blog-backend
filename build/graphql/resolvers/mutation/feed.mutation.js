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
exports.feedMutation = void 0;
const Feed_1 = __importDefault(require("../../../models/Feed"));
// exports mutations of feed for user
exports.feedMutation = {
    // adding feed
    addFeed: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { blog_id, user_id, reply_id, content } = data;
        // if lenght of content greater then 300 it will returns an error message
        if (content.length > 300) {
            return {
                feed: null,
                errorMessage: "Your content longer than 300 characters."
            };
        }
        // creating feed
        const createdFeed = yield Feed_1.default.create({
            blog_id,
            user_id,
            likes: 0,
            reply_id,
            content,
            createdAt: new Date(Date.now())
        });
        // returns new feed data
        return {
            feed: createdFeed,
            errorMessage: "No error."
        };
    }),
    // updating feed
    updateFeed: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, content } = data;
        // finding feed by the given id
        const feed = yield Feed_1.default.findById(id);
        // if there is no feed
        if (!feed) {
            return false;
        }
        // updating feed by the new content that comes as a parameter
        yield Feed_1.default.findByIdAndUpdate(id, {
            content
        });
        // returns success
        return true;
    }),
    // deleting feed
    deleteFeed: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // finding feed by the given id
        const feed = yield Feed_1.default.findById(id);
        // if there is no feed
        if (!feed) {
            return false;
        }
        // deleting replies of feed
        yield Feed_1.default.deleteMany({ reply_id: id });
        // deleting feed
        yield Feed_1.default.deleteOne(feed);
        // returns success
        return true;
    }),
    // liking feed
    likeFeed: (_, { id, isUnliking }) => __awaiter(void 0, void 0, void 0, function* () {
        // finding feed by the given id
        const feed = yield Feed_1.default.findById(id);
        // if there is no feed
        if (!feed) {
            return false;
        }
        // getting likes of feed
        const feedLikes = feed.likes;
        let updatedFeedLike;
        // if user is liking
        if (isUnliking === false) {
            updatedFeedLike = feedLikes + 1;
        }
        // if user is unliking
        if (isUnliking === true) {
            updatedFeedLike = feedLikes - 1;
        }
        // updating user likes
        yield Feed_1.default.findByIdAndUpdate(id, {
            likes: updatedFeedLike
        });
        // returns success
        return true;
    })
};
//# sourceMappingURL=feed.mutation.js.map