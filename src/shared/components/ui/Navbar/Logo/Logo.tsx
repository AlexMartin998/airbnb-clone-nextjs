'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export type LogoProps = {};

const Logo: React.FC<LogoProps> = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer"

      // ref to /public
      src="/images/logo.png"

      height="100"
      width="100"
      alt="Logo"
    />
  );
};

export default Logo;
