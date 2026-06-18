import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Category, Product } from "../Types/productTypes";
import {
  getCategories,
  getProduct,
  getProductsByCategory,
  searchProducts,
} from "../api/productApi";

interface ProductState {
  categories: string[];
  selectedCategory: string;
  product: Product | null;
  products: Product[];
  searchQuery: string;
  searchResults: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: ProductState = {
  categories: [],
  selectedCategory: "",
  product: null,
  products: [],
  searchQuery: "",
  searchResults: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
};

export const fetchCategories = createAsyncThunk(
  "products/categories",
  async () => {
    const res = await getCategories();

    return res;
  },
);

export const fetchProductsByCategories = createAsyncThunk(
  "products/list",
  async ({ category, page }: { category: string; page: number }) => {
    console.log("page category: ",page)
    const res = await getProductsByCategory(category, 10, page * 10);
    return res;
  },
);

export const fetchSearchProduct = createAsyncThunk(
  "products/search",
  async ({ query, page }: { query: string; page: number }) => {
    console.log("page in slice when search: ",page)
    const res = await searchProducts(query, 10, page * 10);
    return res;
  },
);

export const fetchProduct = createAsyncThunk(
  "/products/details",
  async (id: number) => {
    const res = await getProduct(id);
    return res;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
      state.page = 0;
      state.products = [];
      state.hasMore = true;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      console.log("action set search : ",action)
      state.searchQuery = action.payload;
      state.page = 0;
      state.searchResults = [];
      state.hasMore = true;
    },
    nextPage(state){
      state.page+=1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.map((item: Category) => item.slug);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch categories";
      })

      .addCase(fetchProductsByCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategories.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page == 0) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products];
        }
        state.hasMore = action.payload.products.length > 0;
      })
      .addCase(fetchProductsByCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "failed to fetch products by category";
      })

      .addCase(fetchSearchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page == 0) {
          state.searchResults = action.payload.products;
        } else {
          state.searchResults = [
            ...state.searchResults,
            ...action.payload.products,
          ];
        }
        state.hasMore = action.payload.products.length > 0;
      })
      .addCase(fetchSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch search product";
      })

      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetched product";
      });
  },
});

export const { setCategory, setSearchQuery,nextPage } = productSlice.actions;
export default productSlice.reducer;
