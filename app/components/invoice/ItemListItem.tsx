"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Input from "../inputs/Input";

interface ItemListItemProps {
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const ItemListItem: React.FC<ItemListItemProps> = ({
  id,
  required,
  register,
  errors,
}) => {
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-4">
        <Input
          id={`${id}_name`}
          required={required}
          register={register}
          errors={errors}
        />
      </div>
      <div>
        <Input
          id={`${id}_qty`}
          required={required}
          register={register}
          errors={errors}
        />
      </div>
      <div className="col-span-2">
        {" "}
        <Input
          id={`${id}_price`}
          required={required}
          register={register}
          errors={errors}
        />
      </div>
      <div className="col-span-2">Total</div>
      <div>Icon</div>
    </div>
  );
};

export default ItemListItem;
