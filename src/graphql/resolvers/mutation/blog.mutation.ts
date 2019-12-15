import { IMutationType } from "../../../@types/ResolverTypes";
import { IBlogResolverReturnType } from "../../../@types/ReturnTypes";
import Blog, { IBlog } from "./../../../models/Blog";

export const blogMutation: IMutationType = {
  createBlog: async (_, { data }): Promise<IBlogResolverReturnType> => {
    const {
      owner_id,
      title,
      content,
      tags,
      likes,
      views,
      img
    }: {
      owner_id: string;
      title: string;
      content: string;
      tags: [string];
      likes: number;
      views: number;
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

    if (content.length > 1000) {
      return {
        blog: null,
        errorMessage: "Your content longer than 1000 characters."
      };
    }

    await Blog.create({
      owner_id,
      title: title.toUpperCase(),
      content,
      tags,
      likes,
      views,
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
  }
};
