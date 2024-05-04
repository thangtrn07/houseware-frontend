'use client';
import React from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { ShoppingCart } from 'lucide-react';
import { IProduct } from '~/interfaces/schema.interfaces';
import useStores from '~/stores/stores';
import { toast } from 'react-toastify';

const CartButton = ({ data }: { data: IProduct }) => {
   const { addToCart } = useStores();

   const handleAddToCart = () => {
      addToCart(data);
      toast.success('Đã thêm sản phẩm vào giỏ hàng');
   };

   return (
      <Tooltip
         showArrow={true}
         content='Thêm vào giỏ hàng'
         radius='none'
         className='rounded'
         closeDelay={0}
      >
         <Button isIconOnly size='sm' className='rounded' onClick={handleAddToCart}>
            <ShoppingCart size={16} />
         </Button>
      </Tooltip>
   );
};

export default CartButton;
