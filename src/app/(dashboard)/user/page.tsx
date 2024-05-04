'use client';
import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import InputUI, { InputPasswordUI } from '~/components/InputUI';
import ButtonUI from '~/components/ButtonUI';
import useStores from '~/stores/stores';
import InforForm from './_components/InforForm';
import AccountForm from './_components/AccountForm';
import LoadingState from '~/components/LoadingState';

const InfoPage = () => {
   const user = useStores((state) => state.user);
   return (
      <section className='section-card'>
         <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex basis-4/12 flex-col items-center justify-center gap-3'>
               <div className='w-3/5'>
                  <picture className='image-cover border-item aspect-square rounded-full'>
                     <Image
                        width={300}
                        height={300}
                        src={user?.image || '/assets/default-avatar.jpg'}
                        alt='avatar image'
                     />
                  </picture>
               </div>
               <ButtonUI
                  className='bg-[--green-color]'
                  color='primary'
                  onClick={() => toast('Tính năng đang phát triển')}
               >
                  Cập nhật ảnh đại diện
               </ButtonUI>
            </div>
            <div className='basis-8/12 space-y-5'>
               {user ? (
                  <>
                     <InforForm />
                     <AccountForm />
                  </>
               ) : (
                  <LoadingState />
               )}
            </div>
         </div>
      </section>
   );
};

export default InfoPage;
