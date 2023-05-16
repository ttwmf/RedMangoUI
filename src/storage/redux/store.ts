import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemsSlice";
import { menuItemApi, shoppingCartApi } from "../../apis";
import { shoppingCartReducer } from "./shoppingCartSlice";

const store = configureStore({
    reducer: {
        shoppingCartStore: shoppingCartReducer,
        menuItemStore: menuItemReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath] : shoppingCartApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(menuItemApi.middleware).concat(shoppingCartApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;

export default store;