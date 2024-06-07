import React from "react";
import SearchBox from "./SearchBox";
import Action from "../../(dashboard)/_components/Action";
import BrandLogo from "~/components/BrandLogo";

const Header = () => {
   return (
      <header className="sticky inset-x-0 top-0 z-30 border-b border-b-[--gray-300-color] bg-white">
         <div className="container flex h-16 items-center justify-between gap-x-2 md:gap-x-4">
            {/* LOGO */}
            <BrandLogo isReponsive />

            {/* SEARCH */}
            <SearchBox />

            {/* ACTION */}
            <Action />
         </div>
      </header>
   );
};

export default Header;
