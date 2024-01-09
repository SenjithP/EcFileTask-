import { apiSlice } from "./apiSlice";
const USER_AUTH_URL = "/api/userAuthentication";


export const authenticationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (data) => ({
        url: `${USER_AUTH_URL}/userRegistration`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${USER_AUTH_URL}/verifyEmail`,
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: `${USER_AUTH_URL}/userLogin`,
        method: "POST",
        body: data,
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: `${USER_AUTH_URL}/userLogout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useVerifyEmailMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
} = authenticationApiSlice;
