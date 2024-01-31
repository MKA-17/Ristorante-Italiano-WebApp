import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist((set, get) => ({
    cart: {
      products: [],
      totalItems: 0,
      totalPrice: 0.0,
    },
    addItemToCart: (item) => {
      // console.log("item state in store: ", item);
    //   console.log("type of price: ", typeof get().cart.totalPrice, typeof item.price)

      const Stateproducts = [...get().cart.products];
      const isProduct = Stateproducts.find((e) => e.id === item.id);
      let newProductsList = [];
      // console.log("inside state: ", Stateproducts)
      if (isProduct) {
        newProductsList = Stateproducts.map((e) => {
          return e.id === item.id
            ? {
                ...item,
                price: eval(((e.price) + (item.price)).toFixed(2)),
                quantity: (e.quantity) + (item.quantity),
              }
            : {
                ...item,
                quantity: (item.quantity),
                price: (item.price),
              };
        });
      } else newProductsList = [...Stateproducts, item];

      set((state) => ({
        cart: {
          products: newProductsList,
          totalItems: state.cart.totalItems + (item.quantity),
          totalPrice: eval((state.cart.totalPrice + (item.price)).toFixed(2)),
        },
      }));
    },
    removeCartItems: (item) => {
      set((state) => ({
        cart: {
          products: state.cart.products.filter((e) => e.id !== item.id),
          totalItems: state.cart.totalItems - (item.quantity),
          totalPrice: eval((state.cart.totalPrice - (item.price)).toFixed(2)),
        },
      }));
    },
    emptyCart: (item) => {
      set(() => ({
        cart: {
          products: [],
          totalItems: 0,
          totalPrice: 0.0,
        }
      }));
    },
  }),     
{
      name: "cart", // a unique name for the storage
      skipHydration: true, // prevents initial hydration from storage
      onRehydrateStorage: () => console.log("Hydrated from storage"), // optional callback on rehydration
    }  )
);
