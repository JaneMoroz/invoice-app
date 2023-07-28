"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Item, PaymentTerm, Status } from "@prisma/client";
import toast from "react-hot-toast";

import Input from "../../inputs/Input";
import CountrySelect from "../../inputs/CountrySelect";
import Select from "../../inputs/Select";
import DatePickerInput from "../../inputs/DatePicker";
import Button from "../../shared/Button";
import ItemList from "./ItemList";
import ItemListItem from "./ItemListItem";

import { useAppDispatch, useInvoice } from "@/redux/hooks";
import {
  createInvoice,
  onClose,
  updateInvoice,
} from "@/redux/features/invoice-slice";

import useCountries from "@/app/hooks/useCountries";
import emailValidationPattern from "@/app/helpers/emailValidationPattern";
import getShortId from "@/app/helpers/getShortId";

import { TERM_VALUES } from "@/app/enums";

const InvoiceModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isOpen, isLoading, isEditing, invoiceToEdit] = useInvoice();
  const { getByValue } = useCountries();

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
      countryFrom: null,
      countryTo: null,
      invoiceDate: new Date(),
      items: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    name: "items",
    control,
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

  // Fill fields when in Editing Mode, Reset fields otherwise
  useEffect(() => {
    if (isEditing && invoiceToEdit) {
      const items = invoiceToEdit.items.map((item: Item) => {
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        };
      });
      const paymentTerm = invoiceToEdit["paymentTerm"] as PaymentTerm;

      for (const key in invoiceToEdit) {
        if (key === "invoiceDate") {
          setCustomValue(key, new Date(invoiceToEdit[key]));
        } else if (key === "countryFrom") {
          setCustomValue(key, getByValue(invoiceToEdit["countryFrom"]));
        } else if (key === "countryTo") {
          setCustomValue(key, getByValue(invoiceToEdit["countryTo"]));
        } else if (key === "paymentTerm") {
          setCustomValue(key, {
            value: invoiceToEdit["paymentTerm"],
            label: TERM_VALUES[paymentTerm],
          });
        } else if (key === "items") {
          replace([...items]);
        } else {
          setCustomValue(key, invoiceToEdit[key]);
        }
      }
    } else {
      reset();
    }
  }, [isEditing, invoiceToEdit]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.items.length === 0) {
      toast.error("You need to add at least 1 item!");
    } else {
      dispatch(createInvoice(data))
        .then(unwrapResult)
        .then(() => {
          router.refresh();
          reset();
        });
    }
  };

  const onDraftSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.items.length === 0) {
      toast.error("You need to add at least 1 item!");
    } else {
      dispatch(createInvoice({ ...data, status: Status.DRAFT }))
        .then(unwrapResult)
        .then(() => {
          router.refresh();
          reset();
        });
    }
  };

  const onEditSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.items.length === 0) {
      toast.error("You need to add at least 1 item!");
    } else {
      dispatch(updateInvoice({ ...data, invoiceId: invoiceToEdit.id }))
        .then(unwrapResult)
        .then(() => {
          router.refresh();
          reset();
        });
    }
  };

  const handleDiscard = () => {
    reset();
    dispatch(onClose());
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => dispatch(onClose())}
          className="fixed inset-0 z-20 flex items-center justify-center h-screen px-6 outline-none overlay focus:outline-none bg-black/50"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col justify-between h-full overflow-y-hidden absolute left-0 top-0 w-full sm:w-[620px] md:w-[720px] p-6 pr-2 pb-0 pt-[98px] sm:p-14 sm:pr-8 sm:pb-0 sm:pt-[128px] md:pl-[140px] md:pt-14 z-50 bg-[#FFFFFF] dark:bg-[#141625] sm:rounded-tr-[20px] sm:rounded-br-[20px]"
          >
            <h2 className="pb-6 text-2xl font-semibold sm:pb-12 text-primary">
              {isEditing
                ? `Edit #${getShortId(invoiceToEdit.id)}`
                : "New Invoice"}
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
                  id="description"
                  label="Project Description"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <ItemList>
                <div className="flex flex-col gap-4">
                  {fields.map((_, index) => (
                    <ItemListItem
                      key={index}
                      id={`items[${index}]`}
                      register={register}
                      errors={errors}
                      required
                      watch={watch}
                      remove={remove}
                      setCustomValue={setCustomValue}
                      index={index}
                    />
                  ))}
                  <Button
                    label="+ Add New Item"
                    stretch
                    grey
                    onClick={() => {
                      append({});
                    }}
                  />
                </div>
              </ItemList>
            </div>
            {/* Form buttons */}
            <div
              className={`flex py-6 pl-0 pr-5 gap-2
                        ${isEditing ? "justify-end" : "justify-between"}`}
            >
              <Button
                disabled={isLoading}
                onClick={handleDiscard}
                base
                label={isEditing ? "Cancel" : "Discard"}
              />
              <div className="flex gap-2">
                {!isEditing && (
                  <Button
                    disabled={isLoading}
                    darkGrey
                    label="Save as Draft"
                    onClick={handleSubmit(onDraftSubmit)}
                  />
                )}
                <Button
                  disabled={isLoading}
                  purple
                  label={isLoading ? "Save changes" : "Save & Send"}
                  onClick={
                    isEditing
                      ? handleSubmit(onEditSubmit)
                      : handleSubmit(onSubmit)
                  }
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default InvoiceModal;
