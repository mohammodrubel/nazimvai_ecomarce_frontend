import { RootApi } from "../api/apiSlice";

export const userApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    fatchAllUser: builder.query({
      query: () => '/user/get-all-users',
      providesTags:['user']
    }),
   
  }),
});

export const {useFatchAllUserQuery} = userApi;