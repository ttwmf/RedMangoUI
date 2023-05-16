import { createSlice } from "@reduxjs/toolkit";
import { cartItemModel, shoppingCartModel } from "../../interfaces";

const initialState: shoppingCartModel = {
    cartItems: [],
}
const shoppingCartSlice = createSlice({
    name: "cartItems",
    initialState: initialState,
    reducers: {
        setShoppingCart: (state, action) => {
            state.cartItems = action.payload;
        },
        updateQuantity: (state, action) => {
            state.cartItems = state.cartItems?.map((item) => {
                if (item.id === action.payload.id){
                    item.quantity = action.payload.quantity;
                }
                return item;
            })
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems?.filter((item) => item.id != action.payload.id)
        }    
    }
})

export const {setShoppingCart, updateQuantity, removeFromCart} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;