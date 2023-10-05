'use client';

export type MenuItemProps = { label: string; onClick: () => void };

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </button>
  );
};

export default MenuItem;
