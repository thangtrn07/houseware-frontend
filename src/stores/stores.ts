import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import { AuthSlice, authSlice } from "./authSlice";
import { CartSlice, cartSlice } from "./cartSlice";

const useStores = create<AuthSlice & CartSlice, any>(
   persist(
      devtools((...a) => ({
         ...authSlice(...a),
         ...cartSlice(...a),
      })),
      { name: "cart-storage", partialize: (state) => ({ cart: state.cart }) }
   )
);

export default useStores;
