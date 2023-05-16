import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const menuItemApi = createApi({
    reducerPath: "menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44353/api/",
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) =>({
        getMenuItems: builder.query({
            query: () => ({
                url: "menu-items/all"
            }),
            providesTags: ["MenuItems"]
        }),
        getMenuItemById: builder.query({
            query: (id) => ({
                url: `menu-items/${id}`
            }),
            providesTags: ["MenuItems"]
        })
    })
});

export const {useGetMenuItemsQuery, useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;