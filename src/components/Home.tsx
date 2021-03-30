import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import {
  getPosts,
  createNewPost,
  removePost,
  changePost,
} from '../redux/ducks/postsDucks';
import { Post } from '../types';
import { AppStateType } from '../redux/ducks';

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
    <div>
      <div>Posts</div>
      <ul>
        {posts.map((post) => (
          <li className="post" key={post.id}>
            <div>{post.title}</div>
            <div>{post.body}</div>
            <button type="button" onClick={() => onEdit(post.id)}>
              edit
            </button>
            <button type="button" onClick={() => deletePost(post.id)}>
              Delete
            </button>
            <button type="button" onClick={() => onMore(post.id)}>
              More
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
    </div>
  );
};

export default Home;
