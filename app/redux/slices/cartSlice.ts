import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Sepetteki ürünler ve miktarlarını tutacak state
interface CartState {
  items: { id: string; title: string; quantity: number; image: string }[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: string; title: string; image: string }>) => {
      // Ürün zaten sepette var mı kontrol et
      const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingProductIndex >= 0) {
        // Eğer ürün varsa, miktarı artır
        state.items[existingProductIndex].quantity += 1;
      } else {
        // Yeni ürün ekle
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingProductIndex = state.items.findIndex(item => item.id === action.payload);

      if (existingProductIndex >= 0 && state.items[existingProductIndex].quantity > 1) {
        // Eğer ürün varsa ve miktar 1'den fazla ise, miktarı azalt
        state.items[existingProductIndex].quantity -= 1;
      } else {
        // Miktar 1 ise, ürünü sepetten tamamen çıkar
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
