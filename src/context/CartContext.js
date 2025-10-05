import React, { createContext, useReducer, useEffect, useMemo } from "react";
import * as constants from './constants';

export const CartContext = createContext();

const initialState = {
  isCartOpen: false,
  cartItems: [],
  shippingAddress: {},
  paymentMethod: 'COD',
};

function cartReducer(state, action) {
  switch (action.type) {
    case constants.LOAD_STATE:
      // On initial load, populate state from localStorage if it exists.
      return action.payload ? { ...initialState, ...action.payload } : initialState;
    
    case constants.TOGGLE_CART:
      // Toggles the visibility of the cart sidebar.
      return { ...state, isCartOpen: !state.isCartOpen };
    
    case constants.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id === newItem.id);
      
      // If item already exists in cart, just increase its quantity.
      // Otherwise, add the new item to the cart.
      const cartItems = existItem
        ? state.cartItems.map((item) =>
            item.id === existItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...state.cartItems, newItem];
      
      return { ...state, cartItems };
    }

    case constants.CART_UPDATE_QUANTITY: {
        const { id, quantity } = action.payload;
        // Find the item and update its quantity directly.
        const cartItems = state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        return { ...state, cartItems };
    }

    case constants.CART_REMOVE_ITEM: {
      // Filter out the item that needs to be removed.
      const cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      return { ...state, cartItems };
    }
    
    case constants.CART_CLEAR:
      // Clear all items from the cart, e.g., after an order is placed.
      return { ...state, cartItems: [] };
      
    case constants.SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
      
    case constants.SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
      
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load state from localStorage on initial render.
  useEffect(() => {
    try {
      const savedState = JSON.parse(localStorage.getItem('globalMartCheckoutState'));
      if (savedState) {
        dispatch({ type: constants.LOAD_STATE, payload: savedState });
      }
    } catch (error) {
      console.error("Failed to load state from localStorage:", error);
    }
  }, []);

  // Save state to localStorage whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem('globalMartCheckoutState', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  }, [state]);

  // Centralized calculations for cart totals.
  const totals = useMemo(() => {
    const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.price.replace('$', '')), 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = itemsPrice * 0.15;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      totalItems: state.cartItems.reduce((a, c) => a + c.quantity, 0),
    };
  }, [state.cartItems]);

  const value = { state, dispatch, totals };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}