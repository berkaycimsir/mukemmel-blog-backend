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
exports.User = void 0;
const Feed_1 = __importDefault(require("./../../../models/Feed"));
const Blog_1 = __importDefault(require("../../../models/Blog"));
const Comment_1 = __importDefault(require("../../../models/Comment"));
// exports user queries for use
exports.User = {
    // comments query for get comments of user
    comments: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        const comments = yield Comment_1.default.find({ user_id: parent.id });
        const sortedComments = comments.sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1);
        return sortedComments;
    }),
    // blogs query for get blogs of user
    blogs: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        const blogs = yield Blog_1.default.find({ owner_id: parent.id });
        const sortedBlogs = blogs.sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1);
        return sortedBlogs;
    }),
    // feeds query for get feeds of user
    feeds: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        const feeds = yield Feed_1.default.find({ user_id: parent.id });
        const sortedFeeds = feeds.sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1);
        return sortedFeeds;
    })
};
//# sourceMappingURL=User.js.map