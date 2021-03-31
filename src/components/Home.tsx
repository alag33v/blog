import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdModeEdit } from 'react-icons/md';
import { AppStateType } from '../redux/ducks';
import {
  getPosts,
  createNewPost,
  removePost,
  changePost,
} from '../redux/ducks/postsDucks';
import { Post } from '../types';
import { StyledHome } from '../styles/components/StyledHome';

const Home: FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { posts } = useSelector((state: AppStateType) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const addNewPost = () => {
    if (title.trim() && body.trim()) {
      const newObj: Post = {
        id: uuid(),
        title,
        body,
      };
      dispatch(createNewPost(newObj));
      setTitle('');
      setBody('');
    } else {
      toast.error('Enter your message');
    }
  };

  const onEdit = (id: number | string) => {
    if (title.trim() && body.trim()) {
      const newObj = {
        id,
        title,
        body,
      };
      dispatch(changePost(newObj));
      setTitle('');
      setBody('');
    } else {
      toast.error('Enter your message');
    }
  };

  const deletePost = (id: number | string) => {
    dispatch(removePost(id));
  };

  const onMore = (id: number | string) => {
    history.push(`/blog/${id}`);
  };

  return (
    <StyledHome>
      <h1>Messages</h1>
      <input
        className="title__input"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        className="body__textarea"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <button className="create__btn" type="button" onClick={addNewPost}>
        Create Post
      </button>
      <ul className="posts__list">
        {posts.map((post) => (
          <li className="post__item" key={post.id}>
            <h3 className="post__item-title">{post.title}</h3>
            <p className="post__item-body">{post.body}</p>
            <MdModeEdit className="edit" onClick={() => onEdit(post.id)} />
            <TiDeleteOutline
              className="remove"
              onClick={() => deletePost(post.id)}
            />
            <button
              className="more__btn"
              type="button"
              onClick={() => onMore(post.id)}
            >
              More
            </button>
          </li>
        ))}
      </ul>{' '}
    </StyledHome>
  );
};

export default Home;
