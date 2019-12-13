export type User = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
};

export type Blog = {
  owner_id: string;
  title: string;
  content: string;
  tags: [string];
  likes: number;
  createdAt: Date;
};
