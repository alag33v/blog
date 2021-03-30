import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Post = {
  id: number | string;
  title: string;
  body: string;
};

const App: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          'https://bloggy-api.herokuapp.com/posts',
        );
        setPosts(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getPosts();
  }, []);

  const newPost = () => {
    try {
      if (title.trim() && body.trim()) {
        const newObj: Post = {
          id: uuid(),
          title,
          body,
        };
        axios.post('https://bloggy-api.herokuapp.com/posts', newObj);
        setTitle('');
        setBody('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="title">React!</h1>
      <div>Posts</div>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            <div>{item.title}</div>
            <div>{item.body}</div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea onChange={(e) => setBody(e.target.value)} value={body} />
      <button type="button" onClick={newPost}>
        Create
      </button>
      <ToastContainer />
    </div>
  );
};

export default App;
