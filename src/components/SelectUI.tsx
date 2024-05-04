'use client';
import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import tw from '~/lib/tw';

interface Option {
   text: string;
   value: string;
}

interface SelectUIProps {
   label?: string;
   error?: string | undefined;
   className?: string;
   values: Option[];
   [index: string]: any;
}

const SelectUI: ForwardRefRenderFunction<any, SelectUIProps> = (
   { label, values = [], className, error, ...rest },
   ref
) => {
   return (
      <div className='w-full'>
         <label className={tw('mb-2 block text-sm font-medium text-gray-900')}>{label}</label>
         <select
            ref={ref}
            className={tw(
               'transition-ease block w-full rounded border-[1.5px] p-2.5 text-sm text-gray-900 outline-none focus:border-gray-900',
               className,
               error &&
                  'border-red-500 bg-red-50  text-red-900 placeholder-red-700 focus:border-red-500'
            )}
            {...rest}
         >
            <option value='' disabled>
               --- Chọn {label} ---
            </option>
            {values.map((item) => (
               <option key={item.value} value={item.value}>
                  {item.text}
               </option>
            ))}
         </select>
         {error && <p className={tw('mt-1 text-sm text-red-600')}>{error}</p>}
      </div>
   );
};

export default forwardRef(SelectUI);
