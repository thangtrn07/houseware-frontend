'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { IProduct } from '~/interfaces/schema.interfaces';
import useStores from '~/stores/stores';

const ActionGroup = ({ data }: { data: IProduct }) => {
   const router = useRouter();
   const { addToCart } = useStores();

   const handleAddToCart = () => {
      addToCart(data);
      toast.success('Đã thêm sản phẩm vào giỏ hàng');
   };

   const handleBuyNow = () => {
      handleAddToCart();
      router.push('/cart');
   };

   return (
      <div className='flex gap-3'>
         <Button
            variant='bordered'
            className='border-1 w-full max-w-40 rounded border-[--blue-color] text-[--blue-color]'
            onClick={handleAddToCart}
         >
            Thêm vào giỏ hàng
         </Button>
         <Button
            color='primary'
            className='w-full max-w-40 rounded bg-[--red-color]'
            onClick={handleBuyNow}
         >
            Mua ngay
         </Button>
      </div>
   );
};

export default ActionGroup;
