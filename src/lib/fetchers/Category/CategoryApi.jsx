import { RootApi } from "../api/apiSlice";

export const CategoryApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllCategory: builder.query({
      query: () => '/category/get-all-categories',
      providesTags:['category']
    }),
    
    fetchSingleCategory: builder.query({
      query: (id) => `/category/get-single-category/${id}`,
      providesTags:['category']
    }),
    
    addNewCategory:builder.mutation({
      query:(data)=>({
        url:'/category/add-category',
        method:'POST',
        body:data
      }),
      invalidatesTags:['category'],
    }),
    updateCategory: builder.mutation({
      query: (info) => {
        return {
          url: `/category/update-single-category/${info.id}`, 
          method: 'PUT',
          body: info.data, 
        };
      },
      invalidatesTags: ['category'], 
    }),
  }),
});

export const {useUpdateCategoryMutation,useAddNewCategoryMutation,useFetchAllCategoryQuery,useFetchSingleCategoryQuery} = CategoryApi;