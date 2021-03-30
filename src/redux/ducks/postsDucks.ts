import { Post } from '../../types';

// Actions
const GET_POSTS = 'posts/GET_POSTS';

// Reducer
type InitialStateType = {
  posts: Post[];
};

const initialState: InitialStateType = {
  posts: [],
};

type ActionsType = AddPostType;

export const postsReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

// Action Creators
type AddPostType = {
  type: typeof GET_POSTS;
  payload: Post[];
};

export const addPost = (arr: Post[]): AddPostType => ({
  type: GET_POSTS,
  payload: arr,
});
