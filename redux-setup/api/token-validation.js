import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base = 'https://dev.api.mosaica.io/';
// const base2 = process.env.NEXT_PUBLIC_BASE_URL_ngrok;
export const tokenValidation = createApi({
  reducerPath: "tokenValidation",
  baseQuery: fetchBaseQuery({
    baseUrl: base,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("Auth");
      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      // }
      // headers.set("ngrok-skip-browser-warning", "any");
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    createdTokenValidation: builder.mutation({
      query: (payload) => ({
        url: '/users/validateToken',
        // url: '/user-onboarding/validateToken',
        method: 'POST',
        params: payload
      })
    })
  }),
});

export const {
  useCreatedTokenValidationMutation,
} = tokenValidation;
