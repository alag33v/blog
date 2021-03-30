import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../redux/ducks';
import { StyledPostItem } from '../styles/components/StyledPostItem';

type Props = {
  id: string;
};

const PostItem: FC<RouteComponentProps<Props>> = ({
  match,
}: RouteComponentProps<Props>) => {
  const [body, setBody] = useState('');
  const { posts } = useSelector((state: AppStateType) => state.posts);

  const postsFilter = posts.filter(
    (post) => post.id.toString() === match.params.id,
  );

  const post = postsFilter[0];

  return (
    <StyledPostItem>
      <h1>Message</h1>
      <div className="post">
        <h3 className="post__title">{post.title}</h3>
        <p className="post__body">{post.body}</p>
      </div>
      <h2>Comments</h2>
      <textarea
        className="comment__textarea"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <button className="comment__btn" type="button">
        Add Comment
      </button>
    </StyledPostItem>
  );
};

export default PostItem;
