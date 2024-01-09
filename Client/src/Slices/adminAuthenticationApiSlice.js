import { apiSlice } from "./apiSlice";
const ADMIN_AUTH_URL = "/api/adminAuthentication";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_AUTH_URL}/adminLogin`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_AUTH_URL}/adminLogout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useAdminLogoutMutation } = adminApiSlice;
