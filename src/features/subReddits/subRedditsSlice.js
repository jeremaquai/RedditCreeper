import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../utils/Reddit";

const initialState = {
    subReddits: [],
    randomSubReddits: [],
    activeSub: '/r/Home',
    loading: false,
    fulfilled: false,
    failed: false,
};

const API_ROOT = 'https://www.reddit.com';


export const fetchSubRedditsAsync = createAsyncThunk(
    'subReddits/fetchSubReddits',
    async () => {
        const subReddits = [];
        let response = await fetch(`${API_ROOT}/subreddits.json?&limit=100`);
        // console.log(response1);
        let json = await response.json();
        json.data.children.forEach(element => {
            subReddits.push(element)

        });

        console.log(subReddits);

    //    for (let i = 0; i < 10; i++) {
    //     let lastId = json.data.children[99].data.name;

    //     response = await fetch(`${API_ROOT}/subreddits.json?&after=${lastId}&limit=100`);
        
    //     json = await response.json();
    //     json.data.children.forEach(element => {
    //         subReddits.push(element);
    //     });
    //    }
        
        return subReddits.map(item => {
            return ( {
                id: item.data.id,
                title: item.data.title,
                name: item.data.name,
                displayName: item.data.display_name_prefixed,
                url: item.data.url,
                community_icon: item.data.community_icon,
                iconImage: item.data.icon_img,
                headerImg: item.data.header_img,
                description: item.data.description,

            });
        })
    }
);

export const subRedditsSlice = createSlice({
    name: 'subReddits',
    initialState,
    reducers: {
        addRandomSubReddits: (state, action) => {
            state.randomSubReddits = action.payload;
        },
        addSubReddits: (state, action) => {
            state.subReddits = action.payload;
        },
        addActiveSub: (state, action) => {
            state.activeSub = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubRedditsAsync.pending, (state) => {
                state.loading = true;
                state.fulfilled = false;
                state.failed = false;
            })
            .addCase(fetchSubRedditsAsync.rejected, (state) => {
                state.loading = false;
                state.fulfilled = false;
                state.failed = true;
            })
            .addCase(fetchSubRedditsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.fulfilled = true;
                state.failed = false;
                state.subReddits = action.payload;
            })
    }
});

export const { addSubReddits, addActiveSub, addRandomSubReddits } = subRedditsSlice.actions;

export const selectSubReddits = (state) => state.subReddits.subReddits;
export const selectIsLoading = (state) => state.subReddits.loading;
export const selectActiveSub = (state) => state.subReddits.activeSub;

export default subRedditsSlice.reducer;