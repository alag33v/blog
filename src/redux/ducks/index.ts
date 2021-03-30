import { combineReducers } from 'redux';

import { postsReducer } from './postsDucks';

const rootReducer = combineReducers({
  posts: postsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default rootReducer;
