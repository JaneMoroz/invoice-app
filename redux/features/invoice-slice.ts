import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

interface InvoiceSlice {
  isOpen: boolean;
  isLoading: boolean;
}

const initialState: InvoiceSlice = {
  isOpen: false,
  isLoading: false,
};

export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (data: FieldValues) => {
    const res = await axios.post("/api/invoices", data);
    return res.data;
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
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
    builder.addCase(createInvoice.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Invoice created!");
    });

    builder.addCase(createInvoice.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("Something went wrong");
    });
  },
});

export const invoiceReducer = invoiceSlice.reducer;
export const { onOpen, onClose } = invoiceSlice.actions;

export default invoiceSlice;
