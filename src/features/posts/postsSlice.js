import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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

        const posts = [];

        let response = await fetch(`${API_ROOT}${id}.json?&limit=100`);
        // console.log(response);
        
        let json = await response.json();
        // console.log(json);

        json.data.children.forEach(element => {
            posts.push(element);            
        });
        console.log(posts);

        return posts.map(item => {
            return ({
                author: item.data.author,
                id: item.data.id,
                name: item.data.name,
                permalink: item.data.permalink,
                subscribersCount: item.data.subreddit_subscribers,
                url: item.data.url,
                title: item.data.title,
                upVotes: item.data.ups,
                downVotes: item.data.downs,
                text: item.data.selftext,
                thumbnail: item.data.thumbnail,
            });
        })

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
