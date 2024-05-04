'use client';
import { LayoutProps } from '~/interfaces/layout.interfaces';
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import tw, { createVariables } from '~/lib/tw';
import { useState } from 'react';

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
   const variables = createVariables('[--header-height:56px]', '[--sidebar-width:256px]');
   const [showSidebar, setShowSidebar] = useState<boolean>(false);
   return (
      <div className={tw(variables)}>
         <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
         <Sidebar showSidebar={showSidebar} />
         <main className='ml-0 min-h-screen py-4 lg:ml-[--sidebar-width]'>
            <div className='container'>{children}</div>
         </main>
      </div>
   );
};

export default RootLayout;
