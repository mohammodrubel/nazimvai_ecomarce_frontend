import { RootApi } from "../api/apiSlice";

export const productApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: (data) => `/product/get-all-products`,
      providesTags:['product']
    }),
    fetchSingleProducts:builder.query({
      query:(id)=>`/product/get-single-product/${id}`
    }),
    addNewProducts:builder.mutation({
      query:(data)=>({
        url:'/product/add-product',
        method:'POST',
        body:data
      }),
      invalidatesTags:['product'],
    }),
  }),
});

export const {useAddNewProductsMutation,useFetchAllProductsQuery,useFetchSingleProductsQuery} = productApi;