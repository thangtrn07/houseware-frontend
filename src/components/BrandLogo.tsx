import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import tw from '~/lib/tw';

interface BrandLogoProps {
   className?: string;
   size?: number;
   href?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className, size = 46, href = '/' }) => {
   return (
      <Link
         href={href}
         className={tw('flex w-fit cursor-pointer items-center gap-2 text-2xl', className)}
      >
         <Image width={size} height={size} src='/assets/logo.png' alt='logo-brand' />
         <span className='hidden font-bold text-[#8CB7F5] sm:block'>DMStore</span>
      </Link>
   );
};

export default BrandLogo;
