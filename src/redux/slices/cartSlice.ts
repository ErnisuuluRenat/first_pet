import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartItem } from "../../utils/getCartItem";
import { RootState } from "../store";

export type CartItemT = {
  id: string;
  title: string;
  type: string;
  count: number;
  price: number;
  imageUrl: string;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemT[];
}

const cardData = getCartItem();

const initialState: CartSliceState = {
  totalPrice: cardData.totalPrice,
  items: cardData.items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //     addItem(state, action) {
    //       state.items.push(action.payload);
    //       state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
    //     },
    addItem(state, action: PayloadAction<CartItemT>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    decreament(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, decreament } =
  cartSlice.actions;

export default cartSlice.reducer;
