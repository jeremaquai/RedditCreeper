import { createSlice, createAsyncThunk, useSelector } from "@reduxjs/toolkit";
import { selectActiveSub } from "../subReddits/subRedditsSlice";

const initialState = {
    posts: [],
    activePost: '',
    loading: false,
    rejected: false,
    fulfilled: false,
};

const API_ROOT = 'https://www.reddit.com';
const ACTIVE_SUB = useSelector(selectActiveSub);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPosts: (state, action) => {
            state.posts = action.payload;
        },
        addActivePost: (state, action) => {
            state.activePost = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase()
    },
});

export const { addPosts, addActivePost } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectActivePosts = (state) => state.posts.activePost;

export default postsSlice.reducer;
