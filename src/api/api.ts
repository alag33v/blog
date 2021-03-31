import axios from 'axios';
import { Post, Comment } from '../types';

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
  async editPost(obj: Post): Promise<Post> {
    const response = await instance.put(`/posts/${obj.id}`, obj);
    return response.data;
  },
};

export const commentsAPI = {
  async fetchComments(id: number | string): Promise<Post> {
    const response = await instance.get(`/posts/${id}?_embed=comments`);
    return response.data;
  },
  async addComments(id: number | string, newObj: Comment): Promise<Comment> {
    const response = await instance.post(`/posts/${id}/comments`, newObj);
    return response.data;
  },
};
