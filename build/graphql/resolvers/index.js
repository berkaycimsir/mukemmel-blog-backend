"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Feed_1 = require("./query/Feed");
const User_1 = require("./query/User");
const Query_1 = require("./query/Query");
const Blog_1 = require("./query/Blog");
const Comment_1 = require("./query/Comment");
const index_1 = require("./mutation/index");
// all resolvers gathered in one object
const resolvers = {
    Query: Query_1.Query,
    Blog: Blog_1.Blog,
    User: User_1.User,
    Comment: Comment_1.Comment,
    Feed: Feed_1.Feeds,
    Mutation: index_1.Mutation
};
// exports resolvers for use
exports.default = resolvers;
//# sourceMappingURL=index.js.map