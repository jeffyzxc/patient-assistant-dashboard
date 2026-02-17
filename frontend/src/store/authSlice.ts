import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../features/authentication/api/auth.api";
import type { LoginRequest, RegisterRequest } from "../features/authentication/interfaces/auth.interfaces";

interface User {
  id: number;
  email: string;
  role: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk<User, LoginRequest>(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const user = await loginUser(payload);
      return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk<User, RegisterRequest>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const user = await registerUser(payload);
      return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token ?? "";
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token ?? "");
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = action.payload as string;
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
