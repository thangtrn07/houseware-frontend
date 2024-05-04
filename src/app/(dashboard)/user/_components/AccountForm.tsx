'use client';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ButtonUI from '~/components/ButtonUI';
import InputUI, { InputPasswordUI } from '~/components/InputUI';
import useStores from '~/stores/stores';
import { changePassword } from '../accounts/_fetch';

const AccountForm = () => {
   const user = useStores((state) => state.user);
   const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
      reset
   } = useForm();

   const mutation = useMutation({
      mutationFn: (data) => changePassword(data),
      onSuccess: () => {
         toast.success('Đổi mật khẩu thành công.');
         reset();
      },
      onError: () => {
         toast.error('Đã có lỗi vui lòng thử lại sau.');
      }
   });

   const onSubmit = (data: any) => {
      mutation.mutate(data);
   };

   return (
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
         <div>
            <h2 className='mb-2 text-lg font-medium'>Tài khoản</h2>
            <div className='grid gap-3 md:grid-cols-2'>
               <InputUI
                  label='Tên đăng nhập'
                  classNames={{ wrapper: 'md:col-span-2' }}
                  disabled
                  {...register('username', { value: user?.account?.username })}
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
               <InputPasswordUI
                  label='Nhập lại mật khẩu'
                  {...register('confirm_password', {
                     required: 'Vui lòng không bỏ trống trường này',
                     minLength: {
                        value: 6,
                        message: 'Mật khẩu ít nhất phải 6 ký tự'
                     },
                     validate: (val: string) => {
                        if (watch('password') != val) {
                           return 'Mật khẩu không trùng khớp';
                        }
                     }
                  })}
                  error={errors?.confirm_password?.message}
               />
            </div>
         </div>
         <div className='flex justify-end'>
            <ButtonUI
               type='submit'
               className='w-40 bg-[--green-color]'
               color='primary'
               isLoading={mutation.isPending}
            >
               Đổi mật khẩu
            </ButtonUI>
         </div>
      </form>
   );
};

export default AccountForm;
