import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";

import ItemListItem from "./ItemListItem";
import Button from "../Button";

interface ItemListProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues, any>;
}

const ItemList: React.FC<ItemListProps> = ({
  register,
  errors,
  watch,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });
  return (
    <div>
      <h2 className="text-lg text-[#777F98] font-bold mb-4">Item List</h2>
      <div className="grid grid-cols-12 text-[12px] font-medium mb-4 gap-4 text-[#7E88C3] dark:text-[#DFE3FA]">
        <div className="col-span-5">Item Name</div>
        <div className="col-span-2">Qty.</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Total</div>
        <div>Icon</div>
      </div>
      <div className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <ItemListItem
            key={index}
            id={`items[${index}]`}
            register={register}
            errors={errors}
            required
            watch={watch}
            remove={() => remove(index)}
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
    </div>
  );
};

export default ItemList;