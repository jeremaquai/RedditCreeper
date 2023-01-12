import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export const {addSearchTerm} = searchSlice.actions;

export const selectSearchTerm = (state) => state.search.searchTerm;

export default searchSlice.reducer;