import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'

const initialState = {
    cartItem: localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [],
}

console.log(initialState.cartItem)

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
                if (existingProduct.in_stock === 0) {
                    toast.error("Sorry, the item is out of stock.");
                } else if (existingProduct.in_stock <= existingProduct.quantity) {
                    toast.error("Sorry, the item is out of stock.");
                } else {
                    existingProduct.quantity += 1;
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                    toast.success("Added to cart");
                }
            } else {
                if (action.payload.in_stock === 0) {
                    toast.error("Sorry, the item is out of stock.");
                } else {
                    const newProduct = { ...action.payload, quantity: 1 };
                    state.cartItem.push(newProduct);
                    localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                    toast.success("Added to cart");
                }
            }
        },
        
        decrementQuantity: (state, action) => {
            const existingProduct = state.cartItem.find(item => item._id === action.payload._id);
            if (existingProduct) {
              if (existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
                toast.warning("Decrementing quantity");
              } else {
                state.cartItem = state.cartItem.filter(item => item._id !== action.payload._id);
                toast.info("Removed from cart");
              }
              localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
            }
          },    

        updateQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const existingProduct = state.cartItem.find(item => item._id === _id);

            if (existingProduct) {
                if (quantity === null || quantity <= 0) {
                    existingProduct.quantity = 1;
                } else if (quantity > existingProduct.in_stock) {
                    toast.error("Quantity exceeds stock.");
                    return;
                } else {
                    existingProduct.quantity = quantity;
                }
                localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
                toast.success("Quantity updated");
            }
        }
    }
})

export const { addProduct, decrementQuantity ,updateQuantity} = ProductSlice.actions
export default ProductSlice.reducer
