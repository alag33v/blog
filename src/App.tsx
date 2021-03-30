import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ToastContainer } from 'react-toastify';
import { getPosts, createNewPost, removePost } from './redux/ducks/postsDucks';
import { Post } from './types';
import { AppStateType } from './redux/ducks';
import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  const { posts } = useSelector((state: AppStateType) => state.posts);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
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
    }
  };

  const deletePost = (id: number | string) => {
    dispatch(removePost(id));
  };

  return (
    <div>
      <h1 className="title">React!</h1>
      <div>Posts</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>{post.title}</div>
            <div>{post.body}</div>
            <button type="button" onClick={() => deletePost(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea onChange={(e) => setBody(e.target.value)} value={body} />
      <button type="button" onClick={addNewPost}>
        Create
      </button>
      <ToastContainer />
    </div>
  );
};
