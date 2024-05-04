import { StateCreator } from 'zustand';
import { IProductCart } from '~/interfaces/cart.interfaces';
import { IProduct } from '~/interfaces/schema.interfaces';

export interface CartSlice {
   cart: IProductCart[];
   addToCart: (product: IProduct) => void;
   increaseQuantity: (productId: string) => void;
   decreaseQuantity: (productId: string) => void;
   removeCart: (productIds: string[]) => void;
}

export const cartSlice: StateCreator<CartSlice> = (set: any) => ({
   cart: [],
   addToCart: (product) =>
      set((state) => ({
         cart: state.cart.some((item) => item.product._id === product._id)
            ? state.cart.map((item) =>
                 item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [...state.cart, { product: product, quantity: 1 }]
      })),
   increaseQuantity: (productId) =>
      set((state) => {
         const updateCart = state.cart.map((item) =>
            item.product._id === productId
               ? {
                    ...item,
                    quantity:
                       item.quantity >= item.product.quantity
                          ? item.product.quantity
                          : item.quantity + 1
                 }
               : item
         );
         return { cart: updateCart };
      }),
   decreaseQuantity: (productId) =>
      set((state) => {
         const updatedCart = state.cart.map((item) =>
            item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
         );
         const filteredCart = updatedCart.filter((item) => item.quantity > 0);
         return { cart: filteredCart };
      }),
   removeCart: (productIds) =>
      set((state) => {
         const updateCart = state.cart.filter((item) => !productIds.includes(item.product._id));
         return { cart: updateCart };
      })
});
