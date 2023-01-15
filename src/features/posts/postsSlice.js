import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectActiveSub } from "../subReddits/subRedditsSlice";

const initialState = {
    posts: [],
    activePost: '',
    loading: false,
    rejected: false,
    fulfilled: false,
};

const API_ROOT = 'https://www.reddit.com';


export const fetchSubRedditPostsAsync = createAsyncThunk(
    'posts/fetchPosts',
    async (id) => {
        const SUB_REDDIT_URL = useSelector(selectActiveSub);
        console.log(SUB_REDDIT_URL);
        const posts = [];
        let response = await fetch(`${API_ROOT}${id}.json`);
        console.log(response);
        let json = await response.json();
        console.log(json);
    }
);


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
            .addCase(fetchSubRedditPostsAsync.pending, (state) => {
                state.loading = true;
                state.fulfilled = false;
                state.rejected = false;
            })
            .addCase(fetchSubRedditPostsAsync.rejected, (state) => {
                state.loading = false;
                state.rejected = true;
                state.fulfilled = false;
            })
            .addCase(fetchSubRedditPostsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.rejected = false;
                state.fulfilled = true;
                state.posts = action.payload;
            })
    },
});

export const { addPosts, addActivePost } = postsSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectActivePosts = (state) => state.posts.activePost;
export const selectIsLoading = (state) => state.posts.loading;

export default postsSlice.reducer;
