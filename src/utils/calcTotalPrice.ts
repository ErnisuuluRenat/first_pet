import { CartItemT } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItemT[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
