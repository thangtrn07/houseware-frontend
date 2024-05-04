'use client';
import { Spinner } from '@nextui-org/react';
import React, { useEffect } from 'react';

const LoadingState = () => {
   return (
      <div className='flex min-h-72 items-center justify-center'>
         <Spinner size='lg' />
      </div>
   );
};

export default LoadingState;

export const LoadingOverState = () => {
   useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
         document.body.style.overflow = 'scroll';
      };
   }, []);

   return (
      <div className='fixed inset-0 z-50 flex h-screen items-center justify-center bg-white/30 backdrop-blur-[2px]'>
         <div className='h-20 w-20 animate-ping rounded-full bg-violet-800'></div>
      </div>
   );
};
