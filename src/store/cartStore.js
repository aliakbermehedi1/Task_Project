import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isCartOpen: false,

      // Cart Toggle Actions
      toggleCart: () => {
        console.log("Toggle cart clicked");
        set({ isCartOpen: !get().isCartOpen });
      },

      closeCart: () => set({ isCartOpen: false }),
      openCart: () => set({ isCartOpen: true }),

      // Cart Item Actions
      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          items: items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Getters
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      // Only persist items, not isCartOpen state
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
