'use client';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import BrandLogo from '~/components/BrandLogo';
import InputUI, { InputPasswordUI } from '~/components/InputUI';
import { login } from './_fetch';
import ButtonUI from '~/components/ButtonUI';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Roles } from '~/interfaces';
import { queryClient } from '~/provider/QueryProvider';

const LoginPage = () => {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm();

   const mutation = useMutation({
      mutationFn: (data) => login(data as any),
      onSuccess: async (data) => {
         const isAdmin = data?.data?.metadata.role === Roles.ADMIN;
         router.push(isAdmin ? '/user' : '/');
         await queryClient.refetchQueries({
            queryKey: ['/auth/me']
         });
         toast.success('Đăng nhập thành công');
      },
      onError: (error: any) => {
         console.log('🚀 ~ LoginPage ~ error: any:', error);
         if (error?.response?.status === 401) {
            toast.warning('Tài khoản hoặc mật khẩu của bạn không đúng.');
         } else if (error?.response?.status === 400) {
            toast.warning(error?.response?.data?.message);
         } else {
            toast.error('Đã có lỗi vui lòng thử lại sau.');
         }
      }
   });

   const onSubmit = (data: any) => {
      console.log('🚀 ~ onSubmit ~ data:', data);
      mutation.mutate(data);
   };

   return (
      <div>
         <section className='bg-gray-50'>
            <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
               <div className='mb-6 flex items-center text-2xl font-semibold text-gray-900'>
                  <BrandLogo />
               </div>
               <div className='w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0'>
                  <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
                     <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                        Đăng nhập
                     </h1>
                     <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <InputUI
                           label='Tên đăng nhập'
                           placeholder='user01'
                           {...register('username', {
                              required: 'Vui lòng không bỏ trống trường này'
                           })}
                           error={errors?.username?.message}
                        />
                        <InputPasswordUI
                           label='Mật khẩu'
                           {...register('password', {
                              required: 'Vui lòng không bỏ trống trường này',
                              minLength: {
                                 value: 6,
                                 message: 'Mật khẩu ít nhất phải 6 ký tự'
                              }
                           })}
                           error={errors?.password?.message}
                        />

                        <div className='flex items-center justify-between'>
                           <div className='flex items-start'></div>
                           <div className='text-primary-600 text-sm font-medium hover:underline'>
                              Quên mật khẩu - liện hệ với quản trị viên
                           </div>
                        </div>
                        {/* <button
                           type='submit'
                           className='bg-primary-600 hover:bg-primary-700 focus:ring-primary-300  w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4'
                        >
                           Sign in
                        </button> */}
                        <ButtonUI
                           type='submit'
                           color='primary'
                           className='w-full'
                           isLoading={mutation.isPending}
                        >
                           Đăng nhập
                        </ButtonUI>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default LoginPage;
