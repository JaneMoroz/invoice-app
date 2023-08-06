"use client";

import { useCallback } from "react";
import { signIn } from "next-auth/react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../shared/Button";

import { useLoginModal, useAppDispatch } from "@/libs/redux/hooks";
import {
  onClose as onLoginModalClose,
  loginUser,
} from "@/libs/redux/features/modals/login-modal-slice";
import { onOpen as onRegisterModalOpen } from "@/libs/redux/features/modals/register-modal-slice";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, isLoading] = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser(data))
      .then(unwrapResult)
      .then(() => {
        router.refresh();
        dispatch(onLoginModalClose);
      });
  };

  const onToggle = useCallback(() => {
    dispatch(onLoginModalClose());
    dispatch(onRegisterModalOpen());
  }, [dispatch]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <div className="w-full h-px bg-[#DFE3FA] dark:bg-[#252945]"></div>
      <Button
        disabled={isLoading}
        grey
        ariaLabel="google sign in"
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        disabled={isLoading}
        grey
        ariaLabel="github sign in"
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2 text-xs font-medium leading-5 text-darkGrey">
          <div>First time using our app?</div>
          <button
            onClick={onToggle}
            className="cursor-pointer text-primary hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      secondaryActionLabel="Back"
      secondaryAction={() => dispatch(onLoginModalClose())}
      onClose={() => dispatch(onLoginModalClose())}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
