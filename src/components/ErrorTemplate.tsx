import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ErrorTemplateProps {
   title?: string;
   subtitle?: string;
}

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({
   title = '500 - Máy chủ hiện đang bi lỗi',
   subtitle = 'Rất tiếc đã xảy ra lỗi. Hãy thử làm mới trang này hoặc vui lòng liên hệ với chúng tôi nếu vấn đề vẫn còn..'
}) => {
   return (
      <>
         <section className='flex min-h-[80vh] items-center justify-center py-10'>
            <div className='text-center'>
               <div className='inline-flex rounded-full bg-red-100 p-4'>
                  <div className='rounded-full bg-red-200 stroke-red-600 p-4'>
                     <svg
                        className='h-16 w-16'
                        viewBox='0 0 28 28'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
                           stroke-width='2'
                           stroke-linecap='round'
                           stroke-linejoin='round'
                        ></path>
                        <path
                           d='M17 16L22 21M22 16L17 21'
                           stroke-width='2'
                           stroke-linecap='round'
                           stroke-linejoin='round'
                        ></path>
                     </svg>
                  </div>
               </div>
               <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>{title}</h1>
               <p className='mt-5 text-slate-600 lg:text-lg'>{subtitle}</p>
            </div>
         </section>
      </>
   );
};

export default ErrorTemplate;
