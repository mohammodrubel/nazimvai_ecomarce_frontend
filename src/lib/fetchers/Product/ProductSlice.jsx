import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const ProductSlice = createSlice({
    name:'product',
    initialState,
    reducers:{}
})

export default ProductSlice.reducer