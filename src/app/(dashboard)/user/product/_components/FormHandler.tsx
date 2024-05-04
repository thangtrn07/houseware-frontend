'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputUI, { InputFileUI } from '~/components/InputUI';
import { ModalType } from '~/components/ModalUI';
import { IProduct } from '~/interfaces/schema.interfaces';

import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import { SunEditorOptions } from 'suneditor/src/options';
import { UploadBeforeHandler } from 'suneditor-react/dist/types/upload';
import { uploadImage } from '../_fetch';
import SelectUI from '~/components/SelectUI';
import { CategoryQueryData } from '../../category/page';
import { useQuery } from '@tanstack/react-query';
import { fetchCategory } from '../../category/_fetch';
import SunEditor from 'suneditor-react';
// const SunEditor = dynamic(() => import('suneditor-react'), {
//    ssr: false
// });

interface FormHandlerProps {
   formId: string;
   onSubmit: (data: any) => void;
   payload?: IProduct | undefined;
   type?: ModalType;
}

const editorOption: SunEditorOptions = {
   mode: 'classic',
   katex: 'window.katex',
   videoFileInput: false,
   tabDisable: false,
   buttonList: [
      [
         'undo',
         'redo',
         'font',
         'fontSize',
         'formatBlock',
         'bold',
         'underline',
         'italic',
         'strike',
         'subscript',
         'superscript',
         'fontColor',
         'hiliteColor',
         'textStyle',
         'removeFormat',
         'outdent',
         'indent',
         'align',
         'horizontalRule',
         'list',
         'lineHeight',
         'table',
         'link',
         'image',
         'video',
         'preview'
      ]
   ]
};

const FormHandler: React.FC<FormHandlerProps> = ({ onSubmit, formId, type, payload }) => {
   const { data } = useQuery<CategoryQueryData>({
      queryKey: ['/category-all'],
      queryFn: () => fetchCategory({})
   });

   const [description, setDescription] = useState<string>(payload?.description || '');

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm();

   const handleChange = (content: any) => {
      setDescription(content);
   };

   function onImageUploadBefore() {
      return (files: File[], info: object, uploadHandler: UploadBeforeHandler) => {
         (async () => {
            const data = await uploadImage(files[0]);
            const res = {
               result: [
                  {
                     url: data?.imageUrl,
                     name: 'thumbnail',
                     size: 600
                  }
               ]
            };

            uploadHandler(res);
         })();

         uploadHandler();
      };
   }

   const formatFormSubmitData = (data: any) => {
      const { image_1, image_2, image_3, image_4, image_5, size, color, brand, origin, ...rest } =
         data;
      const image = [image_1?.[0], image_2?.[0], image_3?.[0], image_4?.[0], image_5?.[0]];
      onSubmit({
         ...rest,
         image: image.filter((x) => !!x),
         detail: {
            size,
            color,
            brand,
            origin
         },
         description
      });
   };

   return (
      <form id={formId} className='space-y-3' onSubmit={handleSubmit(formatFormSubmitData)}>
         {(type === 'view' || type === 'edit') && (
            <InputUI
               label='Mã sản phẩm'
               disabled
               {...register('_id', {
                  value: payload?._id,
                  required: 'Vui lòng không bỏ trống trường này'
               })}
            />
         )}
         <InputUI
            label='Tên sản phẩm'
            readOnly={type === 'view'}
            {...register('name', {
               value: payload?.name,
               required: 'Vui lòng không bỏ trống trường này'
            })}
            error={errors?.name?.message}
         />
         <div>
            <label className='mb-2 block text-sm font-medium text-gray-900'>Hình ảnh</label>
            <div className='flex flex-wrap gap-2'>
               <InputFileUI
                  classNames={{
                     wrapper: 'w-fit'
                  }}
                  disabled={type === 'view' || type === 'edit'}
                  imagePreview={payload?.images?.[0]?.imageUrl}
                  {...register('image_1', {
                     required: type === 'create' ? 'Vui lòng không bỏ trống trường này' : false
                  })}
                  error={errors?.image_1?.message}
               />
               <InputFileUI
                  classNames={{
                     wrapper: 'w-fit'
                  }}
                  disabled={type === 'view' || type === 'edit'}
                  imagePreview={payload?.images?.[0]?.imageUrl}
                  {...register('image_2')}
               />
               <InputFileUI
                  classNames={{
                     wrapper: 'w-fit'
                  }}
                  disabled={type === 'view' || type === 'edit'}
                  imagePreview={payload?.images?.[0]?.imageUrl}
                  {...register('image_3')}
               />
               <InputFileUI
                  classNames={{
                     wrapper: 'w-fit'
                  }}
                  disabled={type === 'view' || type === 'edit'}
                  imagePreview={payload?.images?.[0]?.imageUrl}
                  {...register('image_4')}
               />
               <InputFileUI
                  classNames={{
                     wrapper: 'w-fit'
                  }}
                  disabled={type === 'view' || type === 'edit'}
                  imagePreview={payload?.images?.[0]?.imageUrl}
                  {...register('image_5')}
               />
            </div>
         </div>
         <div className='grid gap-4 md:grid-cols-3'>
            <SelectUI
               label='Danh mục sản phẩm'
               {...register('category', {
                  value: payload?.category?._id,
                  required: 'Vui lòng không bỏ trống trường này'
               })}
               disabled={type === 'view'}
               values={data?.result?.map((item) => ({ value: item._id, text: item.name })) || []}
               defaultValue=''
               error={errors?.category?.message}
            />
            <InputUI
               type='number'
               label='Số lương sản phẩm'
               readOnly={type === 'view'}
               {...register('quantity', {
                  value: payload?.quantity,
                  required: 'Vui lòng không bỏ trống trường này',
                  min: {
                     value: 0,
                     message: 'Số lượng sản phẩm phải lớn hơn hoặc bằng 0.'
                  }
               })}
               error={errors?.quantity?.message}
            />
            <InputUI
               type='number'
               label='Giá bán'
               readOnly={type === 'view'}
               {...register('price', {
                  value: payload?.price,
                  required: 'Vui lòng không bỏ trống trường này',
                  min: {
                     value: 0,
                     message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0.'
                  }
               })}
               error={errors?.price?.message}
            />
         </div>
         <div className='grid-col-2 grid gap-4 md:grid-cols-4'>
            <InputUI
               label='Kích thước'
               readOnly={type === 'view'}
               {...register('size', {
                  value: payload?.detail?.size
               })}
               error={errors?.size?.message}
            />
            <InputUI
               label='Màu sắc'
               readOnly={type === 'view'}
               {...register('color', {
                  value: payload?.detail?.color
               })}
               error={errors?.color?.message}
            />
            <InputUI
               label='Thương hiệu'
               readOnly={type === 'view'}
               {...register('brand', {
                  value: payload?.detail?.brand
               })}
               error={errors?.brand?.message}
            />
            <InputUI
               label='Xuất sứ'
               readOnly={type === 'view'}
               {...register('origin', {
                  value: payload?.detail?.origin
               })}
               error={errors?.origin?.message}
            />
         </div>
         <div>
            <label className='mb-2 block text-sm font-medium text-gray-900'>Mô tả</label>
            <SunEditor
               readOnly={type === 'view'}
               width='100%'
               height='600px'
               defaultValue={payload?.description || ''}
               placeholder='Nhập mô tả sản phẩm'
               onChange={handleChange}
               onImageUploadBefore={onImageUploadBefore() as any}
               setOptions={editorOption}
            />
         </div>
      </form>
   );
};

export default FormHandler;
