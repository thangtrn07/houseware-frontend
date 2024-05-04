'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputUI, { InputFileUI } from '~/components/InputUI';
import { ModalType } from '~/components/ModalUI';
import { ICategory } from '~/interfaces/schema.interfaces';

interface FormHandlerProps {
   formId: string;
   onSubmit: (data: any) => void;
   payload?: ICategory | undefined;
   type?: ModalType;
}

const FormHandler: React.FC<FormHandlerProps> = ({ onSubmit, formId, type, payload }) => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm();

   return (
      <form id={formId} className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
         {(type === 'view' || type === 'edit') && (
            <InputUI
               label='Mã danh mục'
               disabled
               {...register('_id', {
                  value: payload?._id,
                  required: 'Vui lòng không bỏ trống trường này'
               })}
            />
         )}
         <InputUI
            label='Tên danh mục'
            readOnly={type === 'view'}
            {...register('name', {
               value: payload?.name,
               required: 'Vui lòng không bỏ trống trường này'
            })}
            error={errors?.name?.message}
         />
         <InputFileUI
            label='Hình ảnh'
            disabled={type === 'view'}
            imagePreview={payload?.image?.imageUrl}
            {...register('image', {
               required: type === 'create' ? 'Vui lòng không bỏ trống trường này' : false
            })}
            error={errors?.image?.message}
         />
      </form>
   );
};

export default FormHandler;
