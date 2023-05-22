import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { apiResponse } from '../interfaces';

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44353/api/",
    }),
    tagTypes: ["AuthApi"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userRegisterData) => (
                {
                    url: "auth/register",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: userRegisterData
                }
            )
              
        }),
        login: builder.mutation({
            query: (userCredentials) => ({
                url: "auth/login",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userCredentials
            })
        })
    })
});


export const {useRegisterMutation, useLoginMutation} = authApi;
export default authApi;

