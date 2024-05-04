'use client';
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface QuantityButtonProps {
   quantity: number;
   increase: () => void;
   decrease: () => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ quantity, increase, decrease }) => {
   return (
      <div className='inline-block rounded-lg'>
         <div className='flex items-center gap-x-1.5'>
            <Button
               isIconOnly
               type='button'
               size='sm'
               className='inline-flex items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50'
               onClick={decrease}
            >
               <Minus size={18} />
            </Button>
            <span className='flex h-8 w-14 items-center justify-center rounded border bg-transparent p-0 text-center text-gray-800 focus:ring-0 dark:text-white'>
               {quantity}
            </span>
            <Button
               isIconOnly
               type='button'
               size='sm'
               className='inline-flex items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50'
               onClick={increase}
            >
               <Plus size={18} />
            </Button>
         </div>
      </div>
   );
};

export default QuantityButton;
