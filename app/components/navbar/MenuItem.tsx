"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <button
      className="p-2 text-sm font-semibold transition bg-popupBg text-primary"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default MenuItem;
