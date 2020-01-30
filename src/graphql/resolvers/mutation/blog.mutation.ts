import Feed, { IFeed } from "./../../../models/Feed";
import Comment, { IComment } from "./../../../models/Comment";
import { IBlogResolverReturnType } from "./../../../@types/ReturnTypes";
import { IMutationType } from "../../../@types/ResolverTypes";
import Blog, { IBlog } from "./../../../models/Blog";

// export mutations of blog for use.
export const blogMutation: IMutationType = {
  // creating blog
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

    // finding blog by title
    const blog: IBlog = await Blog.findOne({
      title: title.toUpperCase() || title
    });

    // finding blog by img
    const findBlogByImg = await Blog.findOne({ img });

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

    // getting created blog data
    const createdBlog: IBlog = await Blog.findOne({
      title: title.toUpperCase()
    });

    return {
      blog: createdBlog,
      errorMessage: "No error."
    };
  },
  // updating blog
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

    // finding blog by the given id
    const blog: IBlog = await Blog.findById(blog_id);

    // if there is no blog
    if (!blog) {
      return {
        blog: null,
        errorMessage: "Blog does not exists."
      };
    }

    // gathering new blog's data in an object
    const newBlogData: any = {
      title: title ? title : blog.title,
      content: content ? content.toString() : blog.content,
      summary: summary ? summary : blog.summary,
      tags: tags ? tags : blog.tags,
      category: category ? category : blog.category,
      img: img ? img : blog.img
    };

    // updating user
    await Blog.updateOne(blog, newBlogData);

    return {
      blog: newBlogData,
      errorMessage: "No error."
    };
  },
  // updating views of blog
  updateBlogViews: async (_, args): Promise<boolean> => {
    const { id }: { id: string } = args;

    // finding a blog by the given id
    const blog: IBlog = await Blog.findById(id);

    // if there is no blog
    if (!blog) {
      return false;
    }

    // updating blog
    await blog.updateOne({ views: blog.views + 1 });

    // returns success
    return true;
  },
  // deleting blog
  deleteBlog: async (_, args): Promise<IBlogResolverReturnType> => {
    const { id }: { id: string } = args;

    // finding blog by the given id
    const blog: IBlog = await Blog.findById(id);

    // finding comments of blog
    const blogComments: any = await Comment.find({ blog_id: id });

    // finding feeds of blog
    const blogFeeds: IFeed[] = await Feed.find({ blog_id: id });

    // if there is no blog
    if (!blog) {
      return {
        blog: null,
        errorMessage: "Comment does not found."
      };
    }

    // deleting comments of blog
    await Comment.deleteMany(blogComments);
    // deleting feeds of blog
    await Feed.deleteMany(blogFeeds);
    // deleting blog
    await Blog.deleteOne(blog);

    return {
      blog: null,
      errorMessage: "No error."
    };
  }
};
