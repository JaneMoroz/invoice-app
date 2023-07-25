import { configureStore } from "@reduxjs/toolkit";
import { registerModalReducer } from "./features/modals/register-modal-slice";
import { loginModalReducer } from "./features/modals/login-modal-slice";
import { invoiceReducer } from "./features/invoice-slice";

const store = configureStore({
  reducer: {
    registerModal: registerModalReducer,
    loginModal: loginModalReducer,
    invoice: invoiceReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export type ApplicationDispatch = typeof store.dispatch;

export default store;
