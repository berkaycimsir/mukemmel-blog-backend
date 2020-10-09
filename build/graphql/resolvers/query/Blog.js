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
exports.Blog = void 0;
const User_1 = __importDefault(require("../../../models/User"));
const Comment_1 = __importDefault(require("../../../models/Comment"));
// export queries of blog type for use
exports.Blog = {
    // returns a user of blog
    user: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        return yield User_1.default.findById(parent.owner_id);
    }),
    // returns a comments of blog
    comments: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        const comments = yield Comment_1.default.find({ blog_id: parent.id });
        // sorting comments by desc
        const sortedComments = comments.sort((a, b) => Number(a.createdAt) - Number(b.createdAt) > 0 && -1);
        return sortedComments;
    })
};
//# sourceMappingURL=Blog.js.map