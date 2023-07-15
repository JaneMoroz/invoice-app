"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Input from "../inputs/Input";
import CountrySelect from "../inputs/CountrySelect";
import Select from "../inputs/Select";

const InvoiceModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      streetFrom: "",
      cityFrom: "",
      postCodeFrom: "",
      countryFrom: "",
      clientName: "",
      clientEmail: "",
      streetTo: "",
      cityTo: "",
      postCodeTo: "",
      countryTo: "",
      invoiceDate: new Date(),
      paymentTerms: "",
      projectDesc: "",
    },
  });

  const countryFrom = watch("countryFrom");
  const countryTo = watch("countryTo");
  const paymentTerms = watch("paymentTerms");
  const invoiceDate = watch("invoiceDate");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div
      onClick={() => {}}
      className="fixed inset-0 flex items-center justify-center px-6 overflow-x-hidden overflow-y-auto outline-none overlay focus:outline-none bg-black/50"
    >
      <form className="flex flex-col gap-12 absolute left-0 top-[74px] md:top-0 w-full sm:w-[620px] md:w-[720px] h-full overflow-y-auto p-14 pl-[160px] z-50 bg-modal sm:rounded-tr-[20px] sm:rounded-br-[20px]">
        <h2 className="text-2xl font-semibold text-primary">New Invoice</h2>
        {/* Bill from */}
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
          <div className="grid grid-cols-3 gap-2">
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
            <CountrySelect
              label="Country"
              value={countryFrom}
              onChange={(value) => setCustomValue("countryFrom", value)}
            />
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
          <div className="grid grid-cols-3 gap-2">
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
            <CountrySelect
              label="Country"
              value={countryTo}
              onChange={(value) => setCustomValue("countryTo", value)}
            />
          </div>
        </div>
        {/* Invoice details */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-2">
            <Input
              id="invoiceDate"
              label="Invoice Date"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Select
              label="Payment Terms"
              value={paymentTerms}
              onChange={(value) => setCustomValue("paymentTerms", value)}
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
      </form>
    </div>
  );
};

export default InvoiceModal;
