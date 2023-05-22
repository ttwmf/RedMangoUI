import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemsSlice";
import { menuItemApi, shoppingCartApi } from "../../apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
import authApi from "../../apis/authApi";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
    reducer: {
        shoppingCartStore: shoppingCartReducer,
        menuItemStore: menuItemReducer,
        useAuthStore: userAuthReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath] : shoppingCartApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(menuItemApi.middleware).concat(shoppingCartApi.middleware).concat(authApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;

export default store;