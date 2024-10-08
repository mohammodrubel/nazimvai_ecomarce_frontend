import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl:"https://nihonbeautyserver.vercel.app/api/",
    credentials:"include",
    prepareHeaders:(headers,{getState})=>{
        const token = getState().auth.token 
        if(token){
            headers.set('authorization',token)
        }
        return headers
    }
})


    const customBaseQuery =async (args,api,extraOptions)=>{ // 7-5
        const result =await baseQuery(args,api,extraOptions)
        return result
    }


export const RootApi = createApi({
    reducerPath:"api",
    baseQuery:customBaseQuery,
    endpoints:(builder)=>({})
})