import { RootApi } from "../api/apiSlice";

export const authSlice = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => {
        console.log(data,'redux');
        return {
          url: '/auth/register-user',
          method: 'POST',
          body: data
        };
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url:'/auth/login',
        method:'POST',
        body:data
      }),
    }),
  }),
});

export const {useRegistrationMutation,useLoginMutation} = authSlice;