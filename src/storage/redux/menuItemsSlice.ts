import { createSlice } from "@reduxjs/toolkit";

const initailState = {
    menuItem: [],
}

export const menuItemsSlice = createSlice({
    name: "MenuItem",
    initialState: initailState,
    reducers: {
        setMenuItems: (state, action) => {
            state.menuItem = action.payload;
        }
    }
})

export const {setMenuItems} = menuItemsSlice.actions;
export const menuItemReducer = menuItemsSlice.reducer;