import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types/cart';

export const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const incoming = action.payload;
            const existing = state.items.find((item) => item.id === incoming.id);

            if (existing) {
                // do nott exceed available stock
                const nextQty = existing.quantity + incoming.quantity;
                existing.quantity = Math.min(nextQty, existing.stock);
            } else {
                state.items.push({ ...incoming });
            }
            state.error = null;
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.error = null;
        },

        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (!item) return;

            if (quantity <= 0) {
                state.items = state.items.filter((i) => i.id !== id);
            } else {
                item.quantity = Math.min(quantity, item.stock);
            }
            state.error = null;
        },

        clearCart: (state) => {
            state.items = [];
            state.error = null;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
