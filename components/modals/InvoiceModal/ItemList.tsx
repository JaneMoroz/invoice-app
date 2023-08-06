"use client";

interface ItemListProps {
  children: React.ReactNode;
}

const ItemList: React.FC<ItemListProps> = ({ children }) => {
  return (
    <div>
      <h3 className="text-lg text-[#777F98] font-bold mb-4">Item List</h3>
      <div className="hidden sm:grid grid-cols-12 text-[12px] font-medium mb-4 gap-4 text-[#7E88C3] dark:text-[#DFE3FA]">
        <div className="col-span-5">Item Name</div>
        <div className="col-span-2">Quantity</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Total</div>
        <div> </div>
      </div>
      {children}
    </div>
  );
};

export default ItemList;
