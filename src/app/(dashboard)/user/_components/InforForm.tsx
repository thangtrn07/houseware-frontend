'use client';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import ButtonUI from '~/components/ButtonUI';
import InputUI from '~/components/InputUI';
import useStores from '~/stores/stores';
import { updateAccount } from '../accounts/_fetch';
import { toast } from 'react-toastify';
import { queryClient } from '~/provider/QueryProvider';

const InforForm = () => {
   const user = useStores((state) => state.user);
   const {
      register,
      formState: { errors },
      handleSubmit
   } = useForm();

   const mutation = useMutation({
      mutationFn: (data) => updateAccount(data),
      onSuccess: async () => {
         await queryClient.refetchQueries({
            queryKey: ['/auth/me']
         });
         toast.success('Cập nhật thành công.');
      },
      onError: () => {
         toast.error('Đã có lỗi vui lòng thử lại sau.');
      }
   });

   const onSubmit = (data: any) => {
      mutation.mutate({ ...data, _id: user?._id });
   };

   return (
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
         <div>
            <h2 className='mb-2 text-lg font-medium'>Thông tin cá nhân</h2>
            <div className='grid gap-3 md:grid-cols-2'>
               <InputUI label='Họ và tên' {...register('fullname', { value: user?.fullname })} />
               <InputUI label='Số điện thoại' {...register('phone', { value: user?.phone })} />
               <InputUI
                  label='Địa chỉ'
                  classNames={{ wrapper: 'md:col-span-2' }}
                  {...register('address', { value: user?.address })}
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
               Cập nhật
            </ButtonUI>
         </div>
      </form>
   );
};

export default InforForm;
