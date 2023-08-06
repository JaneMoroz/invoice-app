import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

interface RegisterModalState {
  isOpen: boolean;
  isLoading: boolean;
}

const initialState: RegisterModalState = {
  isOpen: false,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "registerModal/registerUser",
  async (data: FieldValues) => {
    const res = await axios.post("/api/register", data);
    return res.data;
  }
);

const registerModalSlice = createSlice({
  name: "registerModal",
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
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Welcome!");
      state.isOpen = false;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("Something went wrong");
    });
  },
});

export const registerModalReducer = registerModalSlice.reducer;
export const { onOpen, onClose } = registerModalSlice.actions;

export default registerModalSlice;
