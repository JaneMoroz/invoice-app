import React from "react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <div className="row-span-2 sm:row-span-1 flex justify-center items-center px-4 py-2.5 capitalize text-[#FF8F00] bg-[#FF8F00]/5 rounded-md">
      <span className="inline-block mr-3 h-2 w-2 rounded-full bg-[#FF8F00]"></span>
      {status}
    </div>
  );
};

export default StatusBadge;
