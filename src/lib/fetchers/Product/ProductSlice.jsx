import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'

const initialState = {
  cartItem: localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [],
}

console.log(initialState.products)

export const ProductSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // add product 
    addProduct: (state, action) => {
      const existingProduct = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        if (existingProduct.in_stock <= existingProduct.quantity) {
          toast.error("Sorry, the item is out of stock.");
        } else {
          existingProduct.quantity += 1;
          localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
          toast.success("added to cart");
        }
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.cartItem.push(newProduct);
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        toast.success("added to cart");
      }
    },


    decrementQuantity: (state, action) => {
      state.cartItem = state.cartItem.map(item => {
        if (item?._id === action.payload?._id) {
          if (item.quantity > 0) {
            toast.warning("Decrementing quantity");
            return {
              ...item,
              quantity: item.quantity - 1
            };
          } else {
            return {
              ...item,
              quantity: 0
            };
          }
        }
        return item;
      });
    },
  }
})

export const { addProduct ,decrementQuantity } = ProductSlice.actions
export default ProductSlice.reducer
