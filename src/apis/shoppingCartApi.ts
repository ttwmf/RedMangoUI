import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
    reducerPath: "shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44353/api/",
    }),
    tagTypes: ["ShoppingCarts"],
    endpoints: (builder) =>({
        getShoppingCartById: builder.query({
            query: (id) => ({
                url: `shopping-carts/${id}`
            }),
            providesTags: ["ShoppingCarts"]
        }),
        getShoppingCartsByUserId: builder.query({
            query: (userId) => ({
                url: `shopping-carts/by-user/${userId}`
            }),
            providesTags: ["ShoppingCarts"]
        }),
        addOrUpdateShoppingCart: builder.mutation({
            query: ({userId, menuItemId, quantity}) => ({
                url: "shopping-carts/add-or-update",
                method: "POST",
                body: {
                    userId: userId,
                    menuItemId: menuItemId,
                    quantity: quantity
                }
            }),
            invalidatesTags: ["ShoppingCarts"]
        }),
    })
});

export const {useGetShoppingCartByIdQuery, useGetShoppingCartsByUserIdQuery, useAddOrUpdateShoppingCartMutation} = shoppingCartApi;
export default shoppingCartApi;