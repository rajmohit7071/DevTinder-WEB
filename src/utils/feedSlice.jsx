import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: [],
    reducers : {
        addUserToFeed: (state,action) =>{
            return action.payload;
        },
        removeUserFromFeed : (state,action) =>{
            const newFeedArr = state.filter((req) => req._id !== action.payload);
            return newFeedArr;
        },
    },
});

export const {addUserToFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;