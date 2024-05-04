'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputUI, { InputFileUI, InputPasswordUI } from '~/components/InputUI';
import { ModalType } from '~/components/ModalUI';
import SelectUI from '~/components/SelectUI';
import { IUser } from '~/interfaces/schema.interfaces';

interface FormHandlerProps {
   formId: string;
   onSubmit: (data: any) => void;
   payload?: IUser | undefined;
   type?: ModalType;
}

const roles = [
   {
      value: 'admin',
      text: 'Quản lý'
   },
   {
      value: 'staff',
      text: 'Nhân viên'
   }
];

const FormHandler: React.FC<FormHandlerProps> = ({ onSubmit, formId, type, payload }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch
   } = useForm();

   return (
      <form id={formId} className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
         {(type === 'view' || type === 'edit') && (
            <InputUI
               label='Mã người dùng'
               disabled
               {...register('_id', {
                  value: payload?._id,
                  required: 'Vui lòng không bỏ trống trường này'
               })}
            />
         )}
         {type === 'create' && (
            <>
               <InputUI
                  label='Tài khoản'
                  {...register('username', {
                     value: payload?.account.username,
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
            </>
         )}
         <InputUI
            label='Họ và tên'
            readOnly={type === 'view'}
            {...register('fullname', {
               value: payload?.fullname,
               required: 'Vui lòng không bỏ trống trường này'
            })}
            error={errors?.fullname?.message}
         />
         <InputUI
            label='Số điện thoại'
            readOnly={type === 'view'}
            {...register('phone', {
               value: payload?.phone
            })}
            error={errors?.phone?.message}
         />
         <InputUI
            label='Địa chỉ'
            readOnly={type === 'view'}
            {...register('address', {
               value: payload?.address
            })}
            error={errors?.address?.message}
         />
         {(type === 'view' || type == 'edit') && (
            <>
               <SelectUI
                  label='Quyền'
                  {...register('role', {
                     value: payload?.role,
                     required: 'Vui lòng không bỏ trống trường này'
                  })}
                  disabled={type === 'view'}
                  values={roles}
                  error={errors?.role?.message}
               />
               <InputFileUI
                  label='Hình ảnh'
                  disabled
                  imagePreview={payload?.image}
                  // {...register('image', {
                  //    required: type === 'create' ? 'Vui lòng không bỏ trống trường này' : false
                  // })}
               />
            </>
         )}
      </form>
   );
};

export default FormHandler;
