'use client';

export type MenuItemProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${className}`}
    >
      {label}
    </button>
  );
};

export default MenuItem;
