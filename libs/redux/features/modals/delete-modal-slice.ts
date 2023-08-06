import { createSlice } from "@reduxjs/toolkit";

interface DeleteModalState {
  isOpen: boolean;
  isLoading: boolean;
  invoiceIdToDelete: string;
}

const initialState: DeleteModalState = {
  isOpen: false,
  isLoading: false,
  invoiceIdToDelete: "",
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    setInvoiceId: (state, action) => {
      state.invoiceIdToDelete = action.payload;
    },
  },
});

export const deleteModalReducer = deleteModalSlice.reducer;
export const { onOpen, onClose, setInvoiceId } = deleteModalSlice.actions;

export default deleteModalSlice;
