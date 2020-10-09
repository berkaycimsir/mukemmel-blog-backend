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
exports.blogMutation = void 0;
const Feed_1 = __importDefault(require("./../../../models/Feed"));
const Comment_1 = __importDefault(require("./../../../models/Comment"));
const Blog_1 = __importDefault(require("./../../../models/Blog"));
// export mutations of blog for use.
exports.blogMutation = {
    // creating blog
    createBlog: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner_id, title, content, summary, tags, category, img } = data;
        // finding blog by title
        const blog = yield Blog_1.default.findOne({
            title: title.toUpperCase() || title
        });
        // finding blog by img
        const findBlogByImg = yield Blog_1.default.findOne({ img });
        // if there is a blog with title that comes as a parameter
        if (blog) {
            return {
                blog: null,
                errorMessage: "Title already exists."
            };
        }
        // if there is a blog with an img that comes as a parameter
        if (findBlogByImg) {
            return {
                blog: null,
                errorMessage: "Image already taken."
            };
        }
        // if length of title greater then 40
        if (title.length > 40) {
            return {
                blog: null,
                errorMessage: "Your title longer than 40 characters."
            };
        }
        // if length of content greater then 10000
        if (content.length > 10000) {
            return {
                blog: null,
                errorMessage: "Your content longer than 10000 characters."
            };
        }
        // if length of summary greater then 200
        if (summary.length > 200) {
            return {
                blog: null,
                errorMessage: "Your summary longer than 200 characters."
            };
        }
        // creating blog
        yield Blog_1.default.create({
            owner_id,
            title: title.toUpperCase(),
            content,
            summary,
            tags,
            likes: 0,
            views: 0,
            category,
            img,
            createdAt: new Date(Date.now())
        });
        // getting created blog data
        const createdBlog = yield Blog_1.default.findOne({
            title: title.toUpperCase()
        });
        return {
            blog: createdBlog,
            errorMessage: "No error."
        };
    }),
    // updating blog
    updateBlog: (_, { data }) => __awaiter(void 0, void 0, void 0, function* () {
        const { blog_id, title, content, summary, tags, category, img } = data;
        // finding blog by the given id
        const blog = yield Blog_1.default.findById(blog_id);
        // if there is no blog
        if (!blog) {
            return {
                blog: null,
                errorMessage: "Blog does not exists."
            };
        }
        // gathering new blog's data in an object
        const newBlogData = {
            title: title ? title : blog.title,
            content: content ? content.toString() : blog.content,
            summary: summary ? summary : blog.summary,
            tags: tags ? tags : blog.tags,
            category: category ? category : blog.category,
            img: img ? img : blog.img
        };
        // updating user
        yield Blog_1.default.updateOne(blog, newBlogData);
        return {
            blog: newBlogData,
            errorMessage: "No error."
        };
    }),
    // updating views of blog
    updateBlogViews: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // finding a blog by the given id
        const blog = yield Blog_1.default.findById(id);
        // if there is no blog
        if (!blog) {
            return false;
        }
        // updating blog
        yield blog.updateOne({ views: blog.views + 1 });
        // returns success
        return true;
    }),
    // deleting blog
    deleteBlog: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // finding blog by the given id
        const blog = yield Blog_1.default.findById(id);
        // finding comments of blog
        const blogComments = yield Comment_1.default.find({ blog_id: id });
        // finding feeds of blog
        const blogFeeds = yield Feed_1.default.find({ blog_id: id });
        // if there is no blog
        if (!blog) {
            return {
                blog: null,
                errorMessage: "Comment does not found."
            };
        }
        // deleting comments of blog
        yield Comment_1.default.deleteMany(blogComments);
        // deleting feeds of blog
        yield Feed_1.default.deleteMany(blogFeeds);
        // deleting blog
        yield Blog_1.default.deleteOne(blog);
        return {
            blog: null,
            errorMessage: "No error."
        };
    })
};
//# sourceMappingURL=blog.mutation.js.map