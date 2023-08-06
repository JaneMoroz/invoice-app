import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

interface LoginModalState {
  isOpen: boolean;
  isLoading: boolean;
}

const initialState: LoginModalState = {
  isOpen: false,
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  "loginModal/loginUser",
  async (data: FieldValues, thunkAPI) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res && !res.ok) {
      return thunkAPI.rejectWithValue(res.error);
    }
    return res;
  }
);

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Welcome back!");
      state.isOpen = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload as string);
    });
  },
});

export const loginModalReducer = loginModalSlice.reducer;
export const { onOpen, onClose } = loginModalSlice.actions;

export default loginModalSlice;
