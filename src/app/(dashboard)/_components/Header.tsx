'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import BrandLogo from '~/components/BrandLogo';
import Action from '~/app/(dashboard)/_components/Action';
import { Menu, X } from 'lucide-react';

const Header = ({
   showSidebar,
   setShowSidebar
}: {
   showSidebar: boolean;
   setShowSidebar: (state: any) => void;
}) => {
   return (
      <header className='sticky inset-x-0 top-0 z-30 border-b border-b-[--gray-300-color] bg-white'>
         <div className='ml-4 flex h-[--header-height] items-center'>
            <Button
               isIconOnly
               onClick={() => setShowSidebar((prev) => !prev)}
               className='lg:hidden'
            >
               {showSidebar ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <BrandLogo className='px-3 text-xl md:w-[--sidebar-width]' size={40} href='/user' />

            <div className='container flex flex-1 items-center justify-end px-4'>
               <Action />
            </div>
         </div>
      </header>
   );
};

export default Header;
