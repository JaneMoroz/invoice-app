import { configureStore } from "@reduxjs/toolkit";
import { registerModalReducer } from "./features/modals/register-modal-slice";
import { loginModalReducer } from "./features/modals/login-modal-slice";

const store = configureStore({
  reducer: {
    registerModal: registerModalReducer,
    loginModal: loginModalReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export type ApplicationDispatch = typeof store.dispatch;

export default store;
