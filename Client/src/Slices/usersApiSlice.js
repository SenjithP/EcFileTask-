import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viewUsers: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/viewUsers?id=${params.id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useViewUsersMutation } = usersApiSlice;
