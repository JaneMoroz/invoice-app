"use client";

import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../inputs/Input";
import CountrySelect from "../inputs/CountrySelect";
import Select from "../inputs/Select";
import DatePickerInput from "../inputs/DatePicker";
import Button from "../shared/Button";
import ItemList from "./ItemList";

import { useAppDispatch, useInvoice } from "@/redux/hooks";
import { createInvoice } from "@/redux/features/invoice-slice";

const InvoiceModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, isLoading] = useInvoice();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      streetFrom: "",
      cityFrom: "",
      postCodeFrom: "",
      countryFrom: null,
      clientName: "",
      clientEmail: "",
      streetTo: "",
      cityTo: "",
      postCodeTo: "",
      countryTo: null,
      invoiceDate: new Date(),
      paymentTerm: "",
      projectDesc: "",
      items: [],
    },
  });

  const countryFrom = watch("countryFrom");
  const countryTo = watch("countryTo");
  const paymentTerm = watch("paymentTerm");
  const invoiceDate = watch("invoiceDate");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const emailValidationPattern = {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "not valid email",
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    dispatch(createInvoice(data))
      .then(unwrapResult)
      .then(() => {
        router.refresh();
        reset();
      });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center h-screen px-6 outline-none overlay focus:outline-none bg-black/50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between h-full overflow-y-hidden absolute left-0 top-0 w-full sm:w-[620px] md:w-[720px] p-6 pr-2 pb-0 pt-[98px] sm:p-14 sm:pr-8 sm:pb-0 sm:pt-[128px] md:pl-[140px] md:pt-14 z-50 bg-modal sm:rounded-tr-[20px] sm:rounded-br-[20px]"
          >
            <h2 className="pb-6 text-2xl font-semibold sm:pb-12 text-primary">
              New Invoice
            </h2>
            {/* Bill from */}
            <div className="flex flex-col gap-12 pr-4 overflow-y-auto sm:pr-6">
              <div className="flex flex-col gap-6">
                <h3 className="text-xs font-bold text-[#7C5DFA]">Bill From</h3>
                <Input
                  id="streetFrom"
                  label="Street Address"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Input
                    id="cityFrom"
                    label="City"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                  <Input
                    id="postCodeFrom"
                    label="Post Code"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                  <div className="col-span-2">
                    <CountrySelect
                      id="countryFrom"
                      label="Country"
                      value={countryFrom}
                      register={register}
                      onChange={(value) => setCustomValue("countryFrom", value)}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              {/* Bill to */}
              <div className="flex flex-col gap-6">
                <h3 className="text-xs font-bold text-[#7C5DFA]">Bill To</h3>
                <Input
                  id="clientName"
                  label="Client’s Name"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id="clientEmail"
                  label="Client’s Email"
                  pattern={emailValidationPattern}
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id="streetTo"
                  label="Street Address"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Input
                    id="cityTo"
                    label="City"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                  <Input
                    id="postCodeTo"
                    label="Post Code"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                  <div className="col-span-2">
                    <CountrySelect
                      id="countryTo"
                      label="Country"
                      value={countryTo}
                      register={register}
                      onChange={(value) => setCustomValue("countryTo", value)}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              {/* Invoice details */}
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 sm:grid-cols-2">
                  <DatePickerInput
                    id="invoiceDate"
                    label="Invoice Date"
                    value={invoiceDate}
                    register={register}
                    onChange={(value) => setCustomValue("invoiceDate", value)}
                    errors={errors}
                  />
                  <Select
                    id="paymentTerm"
                    label="Payment Terms"
                    value={paymentTerm}
                    register={register}
                    onChange={(value) => setCustomValue("paymentTerm", value)}
                    errors={errors}
                  />
                </div>
                <Input
                  id="projectDesc"
                  label="Project Description"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <ItemList
                register={register}
                errors={errors}
                watch={watch}
                control={control}
              />
            </div>
            <div className="flex justify-between py-6 pl-0 pr-5">
              <Button base label="Discard" />
              <div className="flex gap-2">
                <Button darkGrey label="Save as Draft" />
                <Button purple label="Save & Send" type="submit" />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default InvoiceModal;
