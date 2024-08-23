import { RootApi } from "../api/apiSlice";

export const productApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: (args) => {
        const queryString = new URLSearchParams(
          args.reduce((acc, { name, value }) => {
            if (value) acc[name] = value;
            return acc;
          }, {})
        ).toString();
    
        return {
          url: `/product/get-all-products?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['product'],
    }),
    
    fetchSingleProduct: builder.query({
      query: (id) => `/product/get-single-product/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: (data) => ({
        url: '/product/add-product',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const { useAddNewProductMutation, useFetchAllProductsQuery, useFetchSingleProductQuery } = productApi;
