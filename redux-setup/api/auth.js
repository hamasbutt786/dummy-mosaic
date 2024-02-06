import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const base = process.env.NEXT_PUBLIC_BASE_URL
export const authProfile = createApi({
    reducerPath: "authProfile",
    baseQuery: fetchBaseQuery({
        baseUrl: base
    }),
    tagTypes: ["login"],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (loginParams) => ({
                url: `auth/login`,
                method: "POST",
                body: loginParams
            }),
            invalidatesTags: ["login"]
        }),
        //Social log in

        getSocialLogin: builder.mutation({
            query: (loginParams) => ({
                url: `/auth/session`,
                method: "POST",
                body: loginParams
            })
        }),

        getSocialTwitterLogin: builder.mutation({
            query: (loginParams) => ({
                url: `/auth/socialLogin`,
                method: "POST",
                body: loginParams
            })
        }),
        createSocialLoginAuth: builder.mutation({
            query: (payload) => ({
                url: `auth/socialLogin`,
                method: "POST",
                body: payload,
            })
        }),
        createSignUpUser: builder.mutation({
            query: (payload) => ({
                url: "/users/signUp",
                method: "POST",
                body: payload,
            }),
        }),
    })
})
export const {
    // useLazyGetProfileQuery,
    // useLoginUserMutation,
    // useGetSocialLoginMutation,
    // useGetSocialTwitterLoginMutation,
    useCreateSignUpUserMutation,
    useCreateSocialLoginAuthMutation,
} = authProfile
