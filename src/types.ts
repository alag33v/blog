export type Comment = {
  postId: number | string;
  body: string;
  id?: number | string;
};

export type Post = {
  id: number | string;
  title: string;
  body: string;
  comments?: Comment[];
};
