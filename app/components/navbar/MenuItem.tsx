"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <button
      className="px-4 py-3 font-semibold transition hover:bg-[#494E6E] text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MenuItem;
