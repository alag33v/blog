import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../redux/ducks';

type Props = {
  id: string;
};

const PostItem: FC<RouteComponentProps<Props>> = ({
  match,
}: RouteComponentProps<Props>) => {
  const { posts } = useSelector((state: AppStateType) => state.posts);

  const postsFilter = posts.filter(
    (post) => post.id.toString() === match.params.id,
  );

  const post = postsFilter[0];

  return (
    <div>
      <h2>{post.title}</h2>
      <div>{post.body}</div>
    </div>
  );
};

export default PostItem;
