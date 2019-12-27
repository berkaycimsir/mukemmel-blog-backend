export type User = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password?: string;
  gender: string;
  createdAt: Date;
  admin: boolean;
};

export type Blog = {
  owner_id: string;
  title: string;
  content: string;
  tags: [string];
  likes: number;
  img: string;
  views: number;
  category: string;
  createdAt: Date;
};

export type Comment = {
  id?: string;
  blog_id: string;
  user_id: string;
  content: string;
  likes: number;
  createdAt: Date;
};
