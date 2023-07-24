import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import ItemListItem from "./ItemListItem";

interface ItemListProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const ItemList: React.FC<ItemListProps> = ({ register, errors }) => {
  return (
    <div>
      <h2 className="text-lg text-[#777F98] font-bold mb-4">Item List</h2>
      <div className="grid grid-cols-10 text-[12px] font-medium mb-4 gap-4">
        <div className="col-span-4">Item Name</div>
        <div>Qty.</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Total</div>
        <div>Icon</div>
      </div>
      <div className="flex flex-col gap-4">
        <ItemListItem
          id="product1"
          register={register}
          errors={errors}
          required
        />
        <ItemListItem
          id="product2"
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );
};

export default ItemList;
