'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import { Avatar, MenuItem, MenuLink } from '../..';
import { navLinks } from './navLinks';
import { useRegisterModal } from '@/store/useRegisterModal';
import { useLoginModal } from '@/store/useLoginModal';

export type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const onOpenRegisterModal = useRegisterModal(s => s.onOpen);
  const onOpenLoginModal = useLoginModal(s => s.onOpen);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>

        {/* dropdown menu */}
        <button
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[30vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {/* {navLinks.map(({ label, path }) => (
              <MenuLink key={path} label={label} path={path} />
            ))} */}
            <MenuItem label="Login" onClick={onOpenLoginModal} />
            <MenuItem label="Sign up" onClick={onOpenRegisterModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
