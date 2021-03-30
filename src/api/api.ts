import axios from 'axios';
import { Post } from '../types';

export const postsAPI = {
  async fetchPosts(): Promise<Post[]> {
    const response = await axios.get('https://bloggy-api.herokuapp.com/posts');
    return response.data;
  },
};
