import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  image: string;
}

interface ProductsState {
  products: Product[]; // Burada products tanımlandı
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
};

// API'den ürünleri çek
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
