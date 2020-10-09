"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// my schema
const BlogSchema = new mongoose_1.Schema({
    owner_id: { type: String, required: true },
    title: { type: String, required: true, maxlength: 40 },
    content: { type: String, required: true, maxlength: 10000 },
    summary: { type: String, required: true, maxlength: 200 },
    tags: { type: Array },
    likes: { type: Number, default: 0 },
    img: { type: String, required: true, unique: true },
    views: { type: Number, default: 0 },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});
// export my schema for use.
exports.default = mongoose_1.default.model("Blog", BlogSchema);
//# sourceMappingURL=Blog.js.map