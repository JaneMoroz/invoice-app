import { SafeInvoice } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

interface InvoiceSlice {
  isOpen: boolean;
  isLoading: boolean;
  isEditing: boolean;
  invoiceToEdit: any;
}

const initialState: InvoiceSlice = {
  isOpen: false,
  isLoading: false,
  isEditing: false,
  invoiceToEdit: null,
};

export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (data: FieldValues) => {
    const res = await axios.post("/api/invoices", data);
    return res.data;
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (data: String) => {
    const res = await axios.delete(`/api/invoices/${data}`);
    return res.data;
  }
);

export const updateStatus = createAsyncThunk(
  "invoice/updateStatus",
  async (data: String) => {
    const res = await axios.post(`/api/invoices/${data}`);
    return res.data;
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (data: FieldValues & { invoiceId: string }) => {
    const res = await axios.patch(`/api/invoices/${data.invoiceId}`, data);
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
      state.isEditing = false;
      state.invoiceToEdit = null;
    },
    onEdit: (state, action) => {
      state.isOpen = true;
      state.isEditing = true;
      state.invoiceToEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createInvoice.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Invoice is created!");
      state.isOpen = false;
    });

    builder.addCase(createInvoice.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("Something went wrong");
    });

    builder.addCase(deleteInvoice.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Invoice is deleted!");
    });

    builder.addCase(deleteInvoice.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("Something went wrong");
    });

    builder.addCase(updateStatus.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Status is updated!");
    });

    builder.addCase(updateStatus.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("Something went wrong");
    });

    builder.addCase(updateInvoice.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Invoice is updated!");
      state.isOpen = false;
    });

    builder.addCase(updateInvoice.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("Something went wrong");
    });
  },
});

export const invoiceReducer = invoiceSlice.reducer;
export const { onOpen, onClose, onEdit } = invoiceSlice.actions;

export default invoiceSlice;
