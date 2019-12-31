import { IMutationType } from "../../../@types/ResolverTypes";
import { IBlogResolverReturnType } from "../../../@types/ReturnTypes";
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
  deleteBlog: async (_, args): Promise<IBlogResolverReturnType> => {
    const { id }: { id: string } = args;

    const blog: IBlog = await Blog.findById(id);

    if (!blog) {
      return {
        blog: null,
        errorMessage: "Comment does not found."
      };
    }

    await Blog.remove(blog);

    return {
      blog: null,
      errorMessage: "No error."
    };
  }
};
