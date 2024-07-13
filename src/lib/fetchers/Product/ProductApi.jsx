import { RootApi } from "../api/apiSlice";

export const productApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => '/product/get-all-products',
      providesTags:['product']
    }),
    fetchSingleProducts:builder.query({
      query:(id)=>`/products/${id}`
    }),
    addNewProducts:builder.mutation({
      query:(data)=>({
        url:'/product/add-product',
        method:'POST',
        body:data
      }),
      invalidatesTags:['product'],
    }),
    updateProductStocks: builder.mutation({
      query: (data) => {
        console.log(data)
        const totalStock = data.totalStock
        return {
          url: `/products/updatestocks/${data.id}`,
          method: 'PUT',
          body: {totalStock}
        }
      },
      invalidatesTags: ['product'],
    }),
  }),
});

export const {useAddNewProductsMutation,useFetchAllProductsQuery} = productApi;