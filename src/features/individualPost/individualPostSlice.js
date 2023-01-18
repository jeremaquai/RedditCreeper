import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    individualPost: [{
        author: 'author',
        id: 'id',
        numComments: 'numComments',
        thumbnail: '#',
        title: 'Title',
        imgSrc: '#',
        text:'Text',
        subReddit: 'r/initial',
        downs: 1,
        ups: 4,
        upVoteRatio: 0.12,
    }],
    loading: false,
    rejected: false,
    fulfilled: false,
    comments: [],
    comLoading: false,
    comRejected: false,
    comFulfilled: false,
}

const API_ROOT = 'https://www.reddit.com';

export const urlCheck = (url) => {
    const result = url.toString().icludes(API_ROOT);
    if (result) {
        return url;
    } else {
        return `${API_ROOT}${url}`
    }
}

export const fetcchIndividualPostCommentsAsync = createAsyncThunk(
    'individualPost/fetchComments',
    async(url) => {
        let comments = []
        let response = await fetch(`${API_ROOT}${url}.json`);
        let json = await response.json();
        console.log(json);
        json[1].data.children.forEach(element => {
            comments.push(element);
        })
        console.log(comments);
        return comments.map(item => {
            return ({
                id: item.data.id,
                author: item.data.author,
                body: item.data.body,
                downs: item.data.downs,
                ups: item.data.ups,
                replies: item.data.replies,
            });
        })
    }
);

export const fetchIndividualPostAsync = createAsyncThunk(
    'individualPost/fetchPost',
    async (url) => { 
        let response = await fetch(`${API_ROOT}${url}.json`);
        let json = await response.json();
        let listing = json[0].data.children;
        console.log(listing);

        return listing.map(item => {
            return ({
                author: item.data.author,
                id: item.data.id,
                numComments: item.data.num_comments,
                thumbnail: item.data.thumbnail,
                title: item.data.title,
                url: item.data.url,
                text: item.data.selftext,
                subReddit: item.data.subreddit_name_prefixed,
                downs: item.data.downs,
                ups: item.data.ups,
                upVoteRatio: item.data.upvote_ratio,
                isVideo: item.data.is_video,
                secureMedia: item.data.secure_media,
                
            });
        });
    }
    
);

export const individualPostSlice = createSlice({
    name: 'individualPost',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.individualPost = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIndividualPostAsync.pending, (state) => {
                state.loading = true;
                state.rejected = false;
                state.fulfilled = false;
            })
            .addCase(fetchIndividualPostAsync.rejected, (state) => {
                state.loading = false;
                state.rejected = true;
                state.fulfilled = false;
            })
            .addCase(fetchIndividualPostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.rejected = false;
                state.fulfilled = true;
                state.individualPost = action.payload;
            })
            .addCase(fetcchIndividualPostCommentsAsync.pending, (state) => {
                state.comLoading = true;
                state.comRejected = false;
                state.comFulfilled = false;
            })
            .addCase(fetcchIndividualPostCommentsAsync.rejected, (state) => {
                state.comLoading = false;
                state.comRejected = true;
                state.comFulfilled = false;
            })
            .addCase(fetcchIndividualPostCommentsAsync.fulfilled, (state, action) => {
                state.comLoading = false;
                state.comRejected = false;
                state.comFulfilled = true;
                state.comments = action.payload;
            })
    },
});

export const { addPost } = individualPostSlice.actions;

export const selectPost = (state) => state.individualPost.individualPost;
export const selectIsLoading = (state) => state.individualPost.loading;
export const selectComments = (state) => state.individualPost.comments;
export const selectCommentsLoading = (state) => state.individualPost.comLoading;

export default individualPostSlice.reducer;