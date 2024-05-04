'use client';
import React from 'react';
import Header from '~/app/(main)/_components/Header';
import Footer from '~/app/(main)/_components/Footer';
import ErrorTemplate from '~/components/ErrorTemplate';

const NotFoundPage = () => {
   return (
      <>
         <Header />
         <ErrorTemplate />;
         <Footer />
      </>
   );
};

export default NotFoundPage;
