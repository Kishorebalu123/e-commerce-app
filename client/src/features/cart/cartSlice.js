import { createSlice } from '@reduxjs/toolkit';


const savedCart = localStorage.getItem('cart');
const initialState = {
  cart:savedCart && savedCart!=="undefined" ? JSON.parse(savedCart) : [],
  totalItems: 0,   // Initial count of items in the cart
  totalAmount: 0,  // Total price of all items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {  
    // console.log(state.)    
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
    
      }
      state.totalItems += 1;
   
    },
    incrementItem: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
      
      }
    },
    decrementItem: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
  
      }
    },
    removeItem: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        state.totalItems -= item.quantity;
        state.cart = state.cart.filter(item => item.id !== action.payload);
        }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalItems = 0;
      state.totalAmount=0;
    
    },
    calculateTotal: (state) => {
      state.totalAmount = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    },

    setCartItems: (state, action) => {
      state.cart = action.payload;
      state.totalItems = action.payload.reduce((total, item) => total + item.quantity, 0);  // Calculate total items
    },
  },
});

export const { addToCart, incrementItem, decrementItem, removeItem, clearCart, calculateTotal,setCartItems } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cart;

export default cartSlice.reducer;
