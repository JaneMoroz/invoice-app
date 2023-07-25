import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ApplicationState, ApplicationDispatch } from "./store";
import { useMemo } from "react";

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;

export const useRegisterModal = () => {
  const isOpen = useAppSelector((state) => state.registerModal.isOpen);
  const isLoading = useAppSelector((state) => state.registerModal.isLoading);
  return useMemo(() => [isOpen, isLoading] as const, [isOpen, isLoading]);
};

export const useLoginModal = () => {
  const isOpen = useAppSelector((state) => state.loginModal.isOpen);
  const isLoading = useAppSelector((state) => state.loginModal.isLoading);
  return useMemo(() => [isOpen, isLoading] as const, [isOpen, isLoading]);
};

export const useInvoice = () => {
  const isOpen = useAppSelector((state) => state.invoice.isOpen);
  const isLoading = useAppSelector((state) => state.invoice.isLoading);
  return useMemo(() => [isOpen, isLoading] as const, [isOpen, isLoading]);
};
