"use client";

import { useEffect, useState } from "react";

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { Delete } from "@/app/assets/icons/icons";
import Input from "../inputs/Input";

interface ItemListItemProps {
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch: UseFormWatch<FieldValues>;
  remove: () => void;
  index: number;
}

const ItemListItem: React.FC<ItemListItemProps> = ({
  id,
  required,
  register,
  errors,
  watch,
  remove,
  index,
}) => {
  const quantity = watch(`${id}.qty`);
  const price = watch(`${id}.price`);

  const [total, setTotal] = useState("0");

  useEffect(() => {
    setTotal(`${(quantity * price).toFixed(2)}`);
  }, [quantity, price]);

  return (
    <div className="grid items-center grid-cols-12 gap-4">
      <div className="col-span-5">
        <Input
          id={`${id}.name`}
          required={required}
          register={register}
          errors={errors}
          hideErrorMsg
          itemIndex={index}
        />
      </div>
      <div className="col-span-2">
        <Input
          id={`${id}.qty`}
          type="number"
          required={required}
          register={register}
          errors={errors}
          hideErrorMsg
          itemIndex={index}
        />
      </div>
      <div className="col-span-2">
        <Input
          id={`${id}.price`}
          type="number"
          required={required}
          register={register}
          errors={errors}
          hideErrorMsg
          itemIndex={index}
        />
      </div>
      <div className="col-span-2 text-[12px] font-bold">{total}</div>
      <div>
        <button onClick={remove} className="flex justify-center w-full">
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default ItemListItem;
