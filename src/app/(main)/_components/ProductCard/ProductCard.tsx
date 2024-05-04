import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CartButton from './CartButton';
import formatPrice from '~/utils/formatPrice';
import { IProduct } from '~/interfaces/schema.interfaces';

export interface ProductCardProps extends IProduct {}

const ProductCard: React.FC<ProductCardProps> = (props) => {
   const { _id, name, images, category, price, quantity, createdAt, description } = props;

   return (
      <li className='border-item group flex flex-col rounded-md bg-white hover:shadow-lg'>
         <Link href={`/product/${_id}`} className='flex justify-center p-2 md:p-3' title={name}>
            <picture className='image-contain transition-ease aspect-square max-h-48 scale-90 group-hover:scale-100'>
               <Image width={600} height={600} src={images?.[0].imageUrl} alt='product-item' />
            </picture>
         </Link>
         <div className='flex flex-1 flex-col gap-2 border-t border-[--gray-300-color] p-2 md:p-3'>
            <Link href={`/product/${_id}`} title={name} className='flex-1'>
               <h3 className='line-clamp-2 text-sm font-medium hover:text-[--red-color]'>{name}</h3>
            </Link>
            <div className='flex flex-col gap-2'>
               <div className='flex items-end justify-between font-sans text-base font-bold text-[--red-color]'>
                  <p>{formatPrice(price)}</p>
                  <CartButton data={props} />
               </div>
               {/* NOTE */}
               <div className='border-item overflow-hidden rounded bg-[--light-sky-color] p-1'>
                  <p className='line-clamp-2 text-xs' title={name}>
                     Giao hàng tận nơi
                  </p>
               </div>
            </div>
         </div>
      </li>
   );
};

export default ProductCard;
