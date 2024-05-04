'use client';
import React, { ForwardRefRenderFunction, forwardRef, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import tw from '~/lib/tw';
import Image from 'next/image';

interface InputProps {
   label?: string;
   classNames?: {
      wrapper?: string;
      label?: string;
      error?: string;
   };
   className?: string;
   type?: 'text' | 'number';
   error?: string | undefined;
   placeholder?: string;
   disabled?: boolean;
   readOnly?: boolean;
   [index: string]: any;
}

const InputUI: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
   { label, type = 'text', classNames, className, error, placeholder, disabled, readOnly, ...rest },
   ref
) => {
   return (
      <div className={tw('w-full', classNames?.wrapper)}>
         <label className={tw('mb-2 block text-sm font-medium text-gray-900', classNames?.label)}>
            {label}
         </label>
         <input
            ref={ref}
            type={type}
            className={tw(
               'transition-ease block w-full rounded border-[1.5px] p-2.5 text-sm text-gray-900 outline-none focus:border-gray-900',
               className,
               error &&
                  'border-red-500 bg-red-50  text-red-900 placeholder-red-700 focus:border-red-500'
            )}
            placeholder={placeholder || label}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
         />
         {error && <p className={tw('mt-1 text-sm text-red-600', classNames?.error)}>{error}</p>}
      </div>
   );
};

const InputPassword: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
   { label, type = 'text', classNames, className, error, placeholder, ...rest },
   ref
) => {
   const [isVisible, setIsVisible] = useState(false);
   const toggleVisibility = () => setIsVisible(!isVisible);

   return (
      <div className={tw('w-full', classNames?.wrapper)}>
         <label className={tw('mb-2 block text-sm font-medium text-gray-900', classNames?.label)}>
            {label}
         </label>
         <div className='relative'>
            <input
               ref={ref}
               type={isVisible ? 'text' : 'password'}
               className={tw(
                  'transition-ease block w-full rounded border-[1.5px] p-2.5 pr-8 text-sm text-gray-900 outline-none focus:border-gray-900',
                  className,
                  error &&
                     'border-red-500 bg-red-50  text-red-900 placeholder-red-700 focus:border-red-500'
               )}
               placeholder={placeholder || label}
               {...rest}
            />
            <button
               className='absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none'
               type='button'
               onClick={toggleVisibility}
            >
               {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
         </div>
         {error && <p className={tw('mt-1 text-sm text-red-600', classNames?.error)}>{error}</p>}
      </div>
   );
};

export const InputPasswordUI = forwardRef(InputPassword);

interface InputFileProps extends InputProps {
   name: string;
   imagePreview: string;
}

const InputFile: ForwardRefRenderFunction<HTMLInputElement, InputFileProps> = (
   {
      name,
      type = 'text',
      classNames,
      className,
      error,
      label,
      disabled,
      readOnly,
      onChange,
      imagePreview,
      ...rest
   },
   ref
) => {
   const [preview, setPreview] = useState<string>(imagePreview ? imagePreview : '');
   const handleChange = (e: any) => {
      console.log('🚀 ~ Files change', e?.target?.files);
      const file = e?.target?.files[0];
      if (file) {
         setPreview(URL?.createObjectURL(file));
      } else {
         URL?.revokeObjectURL(preview);
         setPreview('');
      }
   };

   useEffect(() => {
      return () => {
         preview && URL?.revokeObjectURL(preview);
      };
   }, [preview]);

   return (
      <div className={tw('w-full', classNames?.wrapper)}>
         <label className={tw('mb-2 block text-sm font-medium text-gray-900', classNames?.label)}>
            {label}
         </label>
         <label
            htmlFor={name}
            className={tw(
               'flex aspect-square w-24 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-1 hover:bg-gray-100',
               classNames,
               error &&
                  'border-red-500 bg-red-50  text-red-900 placeholder-red-700 focus:border-red-500'
            )}
         >
            {preview ? (
               <picture className='image-cover'>
                  <Image width={600} height={600} src={preview!} alt='' />
               </picture>
            ) : (
               <span className='text-sm'>Tải ảnh lên</span>
            )}
         </label>
         <input
            id={name}
            ref={ref}
            name={name}
            type='file'
            className='hidden'
            disabled={disabled}
            readOnly={readOnly}
            onChange={(e: any) => {
               onChange(e);
               handleChange(e);
            }}
            {...rest}
         />
         {error && <p className={tw('mt-1 text-sm text-red-600', classNames?.error)}>{error}</p>}
      </div>
   );
};

export const InputFileUI = forwardRef(InputFile);

export default forwardRef(InputUI);
