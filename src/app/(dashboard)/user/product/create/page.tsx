'use client';
import React from 'react';
import FormHandler from '../_components/FormHandler';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../_fetch';
import ButtonUI from '~/components/ButtonUI';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const formId = 'submit-product';

const CreateProductPage = () => {
   const router = useRouter();

   const createMutation = useMutation({
      mutationFn: (data) => {
         return createProduct(data);
      }
   });

   const handleCreate = (data: any) => {
      createMutation.mutate(data, {
         onSuccess: () => {
            toast.success('Tạo mới sản phẩm thành công.');
            router.push('/user/product');
         }
      });
   };
   return (
      <section className='section-card'>
         <FormHandler formId={formId} onSubmit={handleCreate} type={'create'} />
         <div className='mt-3 flex justify-end gap-3'>
            <ButtonUI variant='light' color='success' onClick={() => router.back()}>
               Quay lại
            </ButtonUI>
            <ButtonUI
               type='submit'
               form={formId}
               color='primary'
               isLoading={createMutation.isPending}
            >
               Thêm mới
            </ButtonUI>
         </div>
      </section>
   );
};

export default CreateProductPage;
