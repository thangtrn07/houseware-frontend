import React from 'react';
import Header from '~/app/(main)/_components/Header';
import Footer from '~/app/(main)/_components/Footer';
import NotFoundTemplate from '~/components/NotFoundTemplate';

const NotFoundPage = () => {
   return (
      <>
         <Header />
         <NotFoundTemplate />;
         <Footer />
      </>
   );
};

export default NotFoundPage;
