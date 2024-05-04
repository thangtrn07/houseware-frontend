'use client';
import React from 'react';
import Breadcrumb from '../_components/Breadcrumb';
import ProductList from './_components/ProductList';
import Fillterbar from './_components/Fillterbar';

const SearchPage = () => {
   return (
      <>
         <Breadcrumb data={['Tìm kiếm']} className='mb-5' />
         <div className='flex flex-col gap-2 md:flex-row'>
            <nav className='md:basis-2/12'>
               <Fillterbar />
            </nav>
            <div className='md:basis-10/12'>
               <ProductList />
            </div>
         </div>
      </>
   );
};

export default SearchPage;
