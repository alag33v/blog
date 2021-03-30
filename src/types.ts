type Comment = {
  postId: number | string;
  body: string;
};

export type Post = {
  id: number | string;
  title: string;
  body: string;
  comments?: Comment[];
};
