import { RootApi } from "../api/apiSlice";

export const BrandApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllBrand: builder.query({
      query: () => '/brand/get-all-brands',
      providesTags:['brand']
    }),
    
    addNewBrand:builder.mutation({
      query:(data)=>({
        url:'/brand/add-brand',
        method:'POST',
        body:data
      }),
      invalidatesTags:['brand'],
    }),
   
  }),
});

export const {useAddNewBrandMutation,useFetchAllBrandQuery} = BrandApi;