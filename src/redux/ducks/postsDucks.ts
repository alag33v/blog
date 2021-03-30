/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { AppStateType } from './index';
import { Post } from '../../types';
import { postsAPI } from '../../api/api';

// Actions
const ADD_POSTS = 'posts/ADD_POSTS';
const NEW_POST = 'posts/NEW_POST';
const DELETE_POST = 'posts/DELETE_POST';
const EDIT_POST = 'posts/EDIT_POST';

// Reducer
type InitialStateType = {
  posts: Post[];
};

const initialState: InitialStateType = {
  posts: [],
};

type ActionsType = AddPostsType | NewPostType | DeletePostType | EditPostType;

export const postsReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case ADD_POSTS:
      return { ...state, posts: action.payload };
    case NEW_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.payload)],
      };
    case EDIT_POST: {
      const posts = [...state.posts];
      const index = posts.findIndex((post) => post.id === action.payload.id);
      posts[index] = { ...action.payload };
      return { posts };
    }
    default:
      return state;
  }
};

// Action Creators
type AddPostsType = {
  type: typeof ADD_POSTS;
  payload: Post[];
};

export const addPosts = (arr: Post[]): AddPostsType => ({
  type: ADD_POSTS,
  payload: arr,
});

type NewPostType = {
  type: typeof NEW_POST;
  payload: Post;
};

export const newPost = (obj: Post): NewPostType => ({
  type: NEW_POST,
  payload: obj,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  payload: number | string;
};

export const deletePost = (id: number | string): DeletePostType => ({
  type: DELETE_POST,
  payload: id,
});

type EditPostType = {
  type: typeof EDIT_POST;
  payload: Post;
};

export const editPost = (obj: Post): EditPostType => ({
  type: EDIT_POST,
  payload: obj,
});

// Thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getPosts = (): ThunkType => async (dispatch) => {
  try {
    const data = await postsAPI.fetchPosts();
    dispatch(addPosts(data));
  } catch (error) {
    toast.error(error.message);
  }
};

export const createNewPost = (newObj: Post): ThunkType => async (dispatch) => {
  try {
    const data = await postsAPI.addPost(newObj);
    dispatch(newPost(data));
    toast.success('Post created');
  } catch (error) {
    toast.error(error.message);
  }
};

export const removePost = (id: number | string): ThunkType => async (
  dispatch,
) => {
  try {
    postsAPI.deletePost(id);
    dispatch(deletePost(id));
    toast.success('Post deleted');
  } catch (error) {
    toast.error(error.message);
  }
};

export const changePost = (obj: Post): ThunkType => async (dispatch) => {
  try {
    const data = await postsAPI.editPost(obj);
    dispatch(editPost(data));
    toast.success('Post edited');
  } catch (error) {
    toast.error(error.message);
  }
};
