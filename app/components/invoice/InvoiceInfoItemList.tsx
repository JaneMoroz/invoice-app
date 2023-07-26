import { Item } from "@prisma/client";

interface InvoiceInfoItemListProps {
  items: Item[];
}

const InvoiceInfoItemList: React.FC<InvoiceInfoItemListProps> = ({ items }) => {
  return (
    <div className="p-6 sm:p-8 bg-[#F9FAFE] dark:bg-[#252945]">
      {/* Table head */}
      <div className="hidden grid-cols-9 mb-6 sm:grid">
        <span className="col-span-4">Item Name</span>
        <span className="justify-self-center">QTY.</span>
        <span className="col-span-2 justify-self-end">Price</span>
        <span className="col-span-2 justify-self-end">Total</span>
      </div>
      {/* Item list */}
      <ul className="flex flex-col gap-6 sm:gap-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="grid items-center grid-cols-2 font-bold sm:grid-cols-9 text-primary"
          >
            <div className="flex flex-col gap-2 sm:col-span-4">
              <span>{item.name}</span>
              <span className="sm:hidden text-[#7E88C3] dark:text-[#888EB0]">
                {item.quantity} x $ {item.price}
              </span>
            </div>
            <span className="hidden sm:block justify-self-center">
              {item.quantity}
            </span>
            <span className="hidden col-span-2 sm:block justify-self-end">
              $ {item.price}
            </span>
            <span className="sm:col-span-2 justify-self-end">
              $ {item.total}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceInfoItemList;
