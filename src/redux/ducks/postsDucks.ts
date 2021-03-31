/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
import { AppStateType } from './index';
import { Post, Comment } from '../../types';
import { postsAPI, commentsAPI } from '../../api/api';

// Actions
const ADD_POSTS = 'posts/ADD_POSTS';
const NEW_POST = 'posts/NEW_POST';
const DELETE_POST = 'posts/DELETE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const ADD_COMMENT = 'posts/ADD_COMMENT';
const CREATE_COMMENT = 'posts/CREATE_COMMENT';

// Reducer
type InitialStateType = {
  posts: Post[];
  post: Post;
};

const initialState: InitialStateType = {
  posts: [],
  post: {
    id: '',
    title: '',
    body: '',
    comments: [],
  },
};

type ActionsType =
  | AddPostsType
  | NewPostType
  | DeletePostType
  | EditPostType
  | AddCommentType
  | NewCommentType;

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
      return { posts, post: state.post };
    }
    case ADD_COMMENT:
      return { ...state, post: action.payload };
    case CREATE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload],
        },
      };
    default:
      return state;
  }
};

// Action Creators
type AddPostsType = {
  type: typeof ADD_POSTS;
  payload: Post[];
};

const addPosts = (arr: Post[]): AddPostsType => ({
  type: ADD_POSTS,
  payload: arr,
});

type NewPostType = {
  type: typeof NEW_POST;
  payload: Post;
};

const newPost = (obj: Post): NewPostType => ({
  type: NEW_POST,
  payload: obj,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  payload: number | string;
};

const deletePost = (id: number | string): DeletePostType => ({
  type: DELETE_POST,
  payload: id,
});

type EditPostType = {
  type: typeof EDIT_POST;
  payload: Post;
};

const editPost = (obj: Post): EditPostType => ({
  type: EDIT_POST,
  payload: obj,
});

type AddCommentType = {
  type: typeof ADD_COMMENT;
  payload: Post;
};

const addComments = (obj: Post): AddCommentType => ({
  type: ADD_COMMENT,
  payload: obj,
});

type NewCommentType = {
  type: typeof CREATE_COMMENT;
  payload: Comment;
};

const newComment = (obj: Comment): NewCommentType => ({
  type: CREATE_COMMENT,
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

export const getComments = (id: number | string): ThunkType => async (
  dispatch,
) => {
  try {
    const data = await commentsAPI.fetchComments(id);
    dispatch(addComments(data));
  } catch (error) {
    toast.error(error.message);
  }
};

export const createNewComment = (
  id: number | string,
  obj: Comment,
): ThunkType => async (dispatch) => {
  try {
    const data = await commentsAPI.addComments(id, obj);
    toast.success('Comment created');
    dispatch(newComment(data));
  } catch (error) {
    toast.error(error.message);
  }
};
