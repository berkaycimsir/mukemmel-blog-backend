import Comment, { IComment } from "./../../../models/Comment";
import { IBlogResolverReturnType } from "./../../../@types/ReturnTypes";
import { IMutationType } from "../../../@types/ResolverTypes";
import Blog, { IBlog } from "./../../../models/Blog";

export const blogMutation: IMutationType = {
  createBlog: async (_, { data }): Promise<IBlogResolverReturnType> => {
    const {
      owner_id,
      title,
      content,
      summary,
      tags,
      category,
      img
    }: {
      owner_id: string;
      title: string;
      content: string;
      summary: string;
      tags: [string];
      category: string;
      img: string;
    } = data;

    const blog: IBlog = await Blog.findOne({
      title: title.toUpperCase() || title
    });

    const findBlogByImg = await Blog.findOne({ img });

    if (blog) {
      return {
        blog: null,
        errorMessage: "Title already exists."
      };
    }

    if (findBlogByImg) {
      return {
        blog: null,
        errorMessage: "Image already taken."
      };
    }

    if (title.length > 40) {
      return {
        blog: null,
        errorMessage: "Your title longer than 40 characters."
      };
    }

    if (content.length > 10000) {
      return {
        blog: null,
        errorMessage: "Your content longer than 10000 characters."
      };
    }

    if (summary.length > 200) {
      return {
        blog: null,
        errorMessage: "Your summary longer than 200 characters."
      };
    }

    await Blog.create({
      owner_id,
      title: title.toUpperCase(),
      content,
      summary,
      tags,
      category,
      img,
      createdAt: new Date(Date.now())
    });

    const createdBlog: IBlog = await Blog.findOne({
      title: title.toUpperCase()
    });

    return {
      blog: createdBlog,
      errorMessage: "No error."
    };
  },
  updateBlog: async (_, { data }): Promise<IBlogResolverReturnType> => {
    const {
      blog_id,
      title,
      content,
      summary,
      tags,
      category,
      img
    }: {
      blog_id: string;
      title?: string;
      content?: string;
      summary?: string;
      tags?: [string];
      category?: string;
      img?: string;
    } = data;

    const blog: IBlog = await Blog.findById(blog_id);

    if (!blog) {
      return {
        blog: null,
        errorMessage: "Blog does not exists."
      };
    }

    const newBlogData: any = {
      title: title ? title : blog.title,
      content: content ? content.toString() : blog.content,
      summary: summary ? summary : blog.summary,
      tags: tags ? tags : blog.tags,
      category: category ? category : blog.category,
      img: img ? img : blog.img
    };

    await Blog.updateOne(blog, newBlogData);

    return {
      blog: newBlogData,
      errorMessage: "No error."
    };
  },
  deleteBlog: async (_, args): Promise<IBlogResolverReturnType> => {
    const { id }: { id: string } = args;

    const blog: IBlog = await Blog.findById(id);

    const blogComments: any = Comment.find({ blog_id: id });

    if (!blog) {
      return {
        blog: null,
        errorMessage: "Comment does not found."
      };
    }

    await Comment.deleteMany(blogComments);
    await Blog.deleteOne(blog);

    return {
      blog: null,
      errorMessage: "No error."
    };
  }
};
