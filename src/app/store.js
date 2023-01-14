import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import searchReducer from '../features/searchbar/searchSlice';
import subRedditsReducer from '../features/subReddits/subRedditsSlice';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    subReddits: subRedditsReducer,
    posts: postsReducer,
  },
});
