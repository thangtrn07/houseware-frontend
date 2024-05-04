import React from 'react';
import { LayoutProps } from '~/interfaces/layout.interfaces';
import Header from './_components/Header';
import Footer from './_components/Footer';

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <>
         <Header />
         <main className='container min-h-screen py-5'>{children}</main>
         <Footer />
      </>
   );
};

export default RootLayout;
