import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getUserDetails`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsMutation } = adminApiSlice;
