/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { AppStateType } from './index';
import { Post } from '../../types';
import { postsAPI } from '../../api/api';

// Actions
const ADD_POSTS = 'posts/ADD_POSTS';
const NEW_POST = 'posts/NEW_POST';

// Reducer
type InitialStateType = {
  posts: Post[];
};

const initialState: InitialStateType = {
  posts: [],
};

type ActionsType = AddPostsType | NewPostType;

export const postsReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case ADD_POSTS:
      return { ...state, posts: action.payload };
    case NEW_POST:
      return { ...state, posts: [...state.posts, action.payload] };
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

// Thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getPosts = (): ThunkType => async (dispatch) => {
  try {
    const data = await postsAPI.fetchPosts();
    dispatch(addPosts(data));
    toast.success('Posts received');
  } catch (error) {
    toast.error(error.message);
  }
};

export const createNewPost = (newObj: Post): ThunkType => async (dispatch) => {
  try {
    const data = await postsAPI.sendPost(newObj);
    dispatch(newPost(data));
    toast.success('Post created');
  } catch (error) {
    toast.error(error.message);
  }
};
