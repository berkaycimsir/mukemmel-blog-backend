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
exports.Feeds = void 0;
const Blog_1 = __importDefault(require("./../../../models/Blog"));
const Feed_1 = __importDefault(require("../../../models/Feed"));
const User_1 = __importDefault(require("../../../models/User"));
// exports queries of feed for user
exports.Feeds = {
    // returns user of feed
    user: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        return yield User_1.default.findById(parent.user_id);
    }),
    // returns replies of feed
    replies: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Feed_1.default.find({ reply_id: parent.id });
    }),
    // returns blog of feed
    blog: (parent) => __awaiter(void 0, void 0, void 0, function* () {
        if (parent.blog_id === "no blog") {
            return null;
        }
        return yield Blog_1.default.findById(parent.blog_id);
    })
};
//# sourceMappingURL=Feed.js.map