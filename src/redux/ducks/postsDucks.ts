/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { AppStateType } from './index';
import { Post } from '../../types';
import { postsAPI } from '../../api/api';

// Actions
const ADD_POSTS = 'posts/ADD_POSTS';

// Reducer
type InitialStateType = {
  posts: Post[];
};

const initialState: InitialStateType = {
  posts: [],
};

type ActionsType = AddPostsType;

export const postsReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case ADD_POSTS:
      return { ...state, posts: action.payload };
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

// Thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getPosts = (): ThunkType => async (dispatch) => {
  try {
    const data = await postsAPI.fetchPosts();
    dispatch(addPosts(data));
    toast.success('Success');
  } catch (error) {
    toast.error(error.message);
  }
};
