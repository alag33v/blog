import axios from 'axios';
import { Post } from '../types';

const instance = axios.create({
  baseURL: 'https://bloggy-api.herokuapp.com',
});

export const postsAPI = {
  async fetchPosts(): Promise<Post[]> {
    const response = await instance.get('/posts');
    return response.data;
  },
  async addPost(newObj: Post): Promise<Post> {
    const response = await instance.post('/posts', newObj);
    return response.data;
  },
  async deletePost(id: number | string): Promise<string> {
    const response = await instance.delete(`/posts/${id}`);
    return response.data;
  },
};
