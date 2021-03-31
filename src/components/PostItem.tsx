import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { MdKeyboardBackspace } from 'react-icons/md';
import { AppStateType } from '../redux/ducks';
import { getComments, createNewComment } from '../redux/ducks/postsDucks';
import { Comment } from '../types';
import { StyledPostItem } from '../styles/components/StyledPostItem';

type Props = {
  id: string;
};

const PostItem: FC<RouteComponentProps<Props>> = ({
  match,
}: RouteComponentProps<Props>) => {
  const [body, setBody] = useState('');
  const { posts, post: postInfo } = useSelector(
    (state: AppStateType) => state.posts,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const postsFilter = posts.filter(
    (post) => post.id.toString() === match.params.id,
  );

  const post = postsFilter[0];

  useEffect(() => {
    dispatch(getComments(post.id));
  }, [post]);

  const addComment = () => {
    if (body.trim()) {
      const newObj: Comment = {
        postId: uuid(),
        body,
      };
      dispatch(createNewComment(post.id, newObj));
      setBody('');
    } else {
      toast.error('Enter your message');
    }
  };

  const onComeBack = () => {
    history.push('/blog');
  };

  return (
    <StyledPostItem>
      <h1>Message</h1>
      <div className="post">
        <h3 className="post__title">{postInfo.title}</h3>
        <p className="post__body">{postInfo.body}</p>
      </div>
      <h2>Comments</h2>
      <ul className="comments__list">
        {postInfo &&
          postInfo.comments.map((comment) => (
            <li
              className="comment__item"
              key={`${comment.postId}_${comment.id}`}
            >
              {comment.body}
            </li>
          ))}
      </ul>
      <textarea
        className="comment__textarea"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <button className="comment__btn" type="button" onClick={addComment}>
        Add Comment
      </button>
      <MdKeyboardBackspace className="back" onClick={onComeBack} />
    </StyledPostItem>
  );
};

export default PostItem;
