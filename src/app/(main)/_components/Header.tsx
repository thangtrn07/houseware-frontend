import React from 'react';
import SearchBox from './SearchBox';
import Action from '../../(dashboard)/_components/Action';
import BrandLogo from '~/components/BrandLogo';

const Header = () => {
   return (
      <header className='sticky inset-x-0 top-0 z-30 border-b border-b-[--gray-300-color] bg-white'>
         <div className='container flex h-16 items-center justify-between'>
            {/* LOGO */}
            <BrandLogo />

            {/* SEARCH */}
            <SearchBox />

            {/* ACTION */}
            <Action />
         </div>
      </header>
   );
};

export default Header;
