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
exports.Query = void 0;
const Feed_1 = __importDefault(require("./../../../models/Feed"));
const User_1 = __importDefault(require("../../../models/User"));
const Blog_1 = __importDefault(require("../../../models/Blog"));
const Comment_1 = __importDefault(require("../../../models/Comment"));
// export queries for use
exports.Query = {
    // user queries
    // returns a user and error message by the given id
    user: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findById(id);
        if (!user) {
            return {
                user: null,
                errorMessage: "User does not exists."
            };
        }
        return {
            user,
            errorMessage: "No error."
        };
    }),
    // returns all users
    users: () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User_1.default.find({});
        return users.sort((a, b) => {
            return Number(a.createdAt) - Number(b.createdAt) > 0 && -1;
        });
    }),
    // returns a current active user
    activeUser: (parent, args, { activeUser }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!activeUser) {
            return {
                user: null,
                errorMessage: "No ActiveUser"
            };
        }
        return {
            user: yield User_1.default.findOne({ username: activeUser.username }),
            errorMessage: "No error."
        };
    }),
    // blog queries
    // returns a blog and error message by the given id
    blog: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield Blog_1.default.findById(id);
        if (!blog) {
            return {
                blog: null,
                errorMessage: "Blog does not exists."
            };
        }
        return {
            blog,
            errorMessage: "No error."
        };
    }),
    // returns all user
    blogs: () => __awaiter(void 0, void 0, void 0, function* () {
        const blogs = yield Blog_1.default.find({});
        return blogs.sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1);
    }),
    // Returns the last 4 blogs added to the database
    getLastFourBlog: () => __awaiter(void 0, void 0, void 0, function* () {
        const allBlogs = yield Blog_1.default.find({});
        const sortedBlogs = allBlogs.sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1);
        const blogs = sortedBlogs.slice(0, 4);
        return blogs;
    }),
    // returns trend blogs
    getTrendBlogs: () => __awaiter(void 0, void 0, void 0, function* () {
        const allBlogs = yield Blog_1.default.find({});
        const trendBlogs = allBlogs.sort((a, b) => Number(a.views) > Number(b.views) && -1);
        return trendBlogs.slice(0, 4);
    }),
    // returns most trend blog in database
    getMostTrendBlog: () => __awaiter(void 0, void 0, void 0, function* () {
        const allBlogs = yield Blog_1.default.find({});
        const mostTrendBlogViews = Math.max.apply(Math, allBlogs.map(blog => blog.views));
        const mostTrendBlog = yield Blog_1.default.findOne({
            views: mostTrendBlogViews
        });
        return {
            blog: mostTrendBlog,
            errorMessage: "No error."
        };
    }),
    // returns blogs by the given category
    getBlogByCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { category } = args;
        const blogs = yield Blog_1.default.find({ category });
        blogs.sort((a, b) => Number(a.createdAt) > Number(b.createdAt) && -1);
        return blogs;
    }),
    // comment queries
    // returns a comment and error message by the given id
    comment: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
        const comment = yield Comment_1.default.findById(id);
        if (!comment) {
            return {
                comment: null,
                errorMessage: "Comment does not exists."
            };
        }
        return {
            comment,
            errorMessage: "No error."
        };
    }),
    // returns all comments
    comments: (_) => __awaiter(void 0, void 0, void 0, function* () {
        const comments = yield Comment_1.default.find({});
        const sortedComments = comments
            .sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1)
            .splice(0, 5);
        return sortedComments;
    }),
    // returns a comment and error message by the given user_id
    getCommentByUserId: (parent, { user_id, blog_id }) => __awaiter(void 0, void 0, void 0, function* () {
        const comment = yield Comment_1.default.findOne({ user_id, blog_id });
        if (!comment) {
            return {
                comment: null,
                errorMessage: "Comment not found."
            };
        }
        return {
            comment,
            errorMessage: "No error."
        };
    }),
    // feed queries
    // returns a feed and errorMessage by the given id
    feed: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        const feed = yield Feed_1.default.findById(id);
        if (!feed) {
            return {
                feed: null,
                errorMessage: "Feed does not found."
            };
        }
        return {
            feed,
            errorMessage: "No error."
        };
    }),
    // returns all feeds
    feeds: () => __awaiter(void 0, void 0, void 0, function* () {
        const feeds = yield Feed_1.default.find({});
        const sortedFeeds = feeds.sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1);
        return sortedFeeds;
    })
};
//# sourceMappingURL=Query.js.map