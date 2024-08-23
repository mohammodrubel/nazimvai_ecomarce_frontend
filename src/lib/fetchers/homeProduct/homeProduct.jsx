import { RootApi } from "../api/apiSlice";

export const productApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllFeatchersProducts: builder.query({
      query: () => "/product/get-all-products", 
      providesTags: ['product'],
    }),
  }),
});

export const { useFetchAllFeatchersProductsQuery } = productApi;
