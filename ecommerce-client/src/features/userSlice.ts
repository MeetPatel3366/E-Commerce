import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "../Types/productTypes";
import { getUser } from "../api/userApi";

type Theme = "light" | "dark";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  theme: Theme;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
  theme: "light",
};

export const fetchUser = createAsyncThunk("/auth/fetchUser", async () => {
  const res = await getUser();
  console.log("res : ", res);
  return res;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log("action ", action);
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuth = false;
        state.error = action.error.message || "failed to fetch user";
      });
  },
});

export const { logout, setTheme } = userSlice.actions;
export default userSlice.reducer;
