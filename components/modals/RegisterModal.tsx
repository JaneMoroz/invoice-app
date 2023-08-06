"use client";

import { useCallback } from "react";

import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../shared/Button";

import { useRegisterModal, useAppDispatch } from "@/libs/redux/hooks";
import {
  onClose as onRegisterModalClose,
  registerUser,
} from "@/libs/redux/features/modals/register-modal-slice";
import { onOpen as onLoginModalOpen } from "@/libs/redux/features/modals/login-modal-slice";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const RegisterModal = () => {
  const dispatch = useAppDispatch();
  const [isOpen, isLoading] = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(registerUser(data))
      .then(unwrapResult)
      .then(() => {
        dispatch(onRegisterModalClose());
        dispatch(onLoginModalOpen());
      });
  };

  const onToggle = useCallback(() => {
    dispatch(onRegisterModalClose());
    dispatch(onLoginModalOpen());
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
        id="name"
        label="Name"
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
        ariaLabel="google sign up"
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        disabled={isLoading}
        grey
        ariaLabel="github sign up"
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2 text-xs font-medium leading-5 text-darkGrey">
          <div>Already have an account?</div>
          <button
            onClick={onToggle}
            className="cursor-pointer text-primary hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      secondaryActionLabel="Back"
      secondaryAction={() => dispatch(onRegisterModalClose())}
      onClose={() => dispatch(onRegisterModalClose())}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
