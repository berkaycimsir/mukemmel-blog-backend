"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const comment_mutation_1 = require("./comment.mutation");
const blog_mutation_1 = require("./blog.mutation");
const user_mutation_1 = require("./user.mutation");
const feed_mutation_1 = require("./feed.mutation");
// all mutation resolvers gathered in one object
exports.Mutation = Object.assign(Object.assign(Object.assign(Object.assign({}, user_mutation_1.userMutation), blog_mutation_1.blogMutation), comment_mutation_1.commentMutation), feed_mutation_1.feedMutation);
//# sourceMappingURL=index.js.map