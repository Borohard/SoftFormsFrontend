import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "auth/api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5267/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        postUserRegister: build.mutation({
            query: (body) => ({
                url: 'UserAuthentication/Register',
                method: 'POST',
                body,
            }),
        }),
        postUserLogin: build.mutation({
            query: (body) => ({
                url: 'UserAuthentication/Login',
                method: 'POST',
                body,
            }),
        })
    })
})

export const {usePostUserRegisterMutation, usePostUserLoginMutation} = authApi
