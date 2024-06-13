import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  cart: object[];
}

export type CartActions = {
  addCartItem: (value: any) => void;
  removeCartItem: (value: any) => void;
  clearCart: () => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore = (): CartState => {
  return { cart: [] };
};

export const defaultInitState: CartState = {
  cart: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set) => ({
        ...initState,
        addCartItem: (value: any) => {
          set((state) => ({ cart: [...state.cart, value] }));
        },
        removeCartItem: (value: any) =>
          set((state) => {
            const newCart = state.cart.filter(
              (item: any) => item.id !== value.id
            );

            return { cart: newCart };
          }),
        clearCart: () =>
          set(() => {
            return { cart: [] };
          }),
      }),

      {
        name: "cart",
      }
    )
  );
};
