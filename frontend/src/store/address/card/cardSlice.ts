import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Food {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating?: number;  // Optional rating
  comment?: string; // Optional comment
}

interface CartItem {
  id: number;
  Food: Food;
  quantity: number;
  changeCount: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartRequest(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    fetchCartSuccess(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchCartFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateQuantityRequest(
      state,
      action: PayloadAction<{ cartItemId: number; newQuantity: number; change: number }>
    ) {
      const { cartItemId, newQuantity } = action.payload;
      const item = state.items.find((item) => item.id === cartItemId);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    updateQuantitySuccess(
      state,
      action: PayloadAction<{ cartItemId: number; newQuantity: number; change: number }>
    ) {
      // Handle success logic if needed, e.g., updating additional fields, logging
      const { cartItemId, newQuantity } = action.payload;
      const item = state.items.find((item) => item.id === cartItemId);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    removeItemRequest(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeItemSuccess(state, action: PayloadAction<number>) {
      // This handles success after removing an item
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateRatingAndCommentRequest(
      state,
      action: PayloadAction<{ cartItemId: number; rating: number; comment: string }>
    ) {
      const { cartItemId, rating, comment } = action.payload;
      const item = state.items.find((item) => item.id === cartItemId);
      if (item) {
        item.Food = {
          ...item.Food,
          rating,
          comment,
        };
      }
    },
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  removeItemRequest,
  removeItemSuccess,
  updateRatingAndCommentRequest,
} = cartSlice.actions;

export default cartSlice.reducer;
