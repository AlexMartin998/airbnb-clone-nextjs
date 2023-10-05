'use client';

import NextLink from 'next/link';

export type MenuItemProps = { label: string; path: string };

const MenuLink: React.FC<MenuItemProps> = ({ label, path }) => {
  return (
    <NextLink
      href={path}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </NextLink>
  );
};

export default MenuLink;
