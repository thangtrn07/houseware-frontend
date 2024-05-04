'use client';
import React, { useState } from 'react';
import { Button, Input, Radio, RadioGroup, Slider } from '@nextui-org/react';
import tw from '~/lib/tw';
import formatPrice from '~/utils/formatPrice';
import { Divider } from '@nextui-org/react';
import { usePathname, useSearchParams } from 'next/navigation';

interface BlockFilterProps {
   title?: string;
   children: React.ReactNode;
   border?: boolean;
   className?: string;
   wrapperClassName?: string;
}

const BlockFilter: React.FC<BlockFilterProps> = ({
   title,
   children,
   border = false,
   wrapperClassName,
   className
}) => {
   return (
      <div className={tw('pb-2', wrapperClassName, border && 'border-b border-[--gray-300-color]')}>
         {title && <h4 className='text-sm font-medium'>{title}</h4>}
         <div className={tw('mt-2', className)}>{children}</div>
      </div>
   );
};

interface DisplayPrice {
   price: number;
}

const DisplayPrice: React.FC<DisplayPrice> = ({ price }) => {
   return (
      <span className='w-full appearance-none rounded border px-2 py-1 text-center text-xs outline-none'>
         {formatPrice(price)}
      </span>
   );
};

const Fillterbar = () => {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const [filter, setFilter] = useState({
      page: Number(searchParams.get('page')) || 1,
      // limit: Number(searchParams.get('limit')) || 25,
      fromPrice: Number(searchParams.get('fromPrice')) || 0,
      toPrice: Number(searchParams.get('toPrice')) || 20000000,
      sort: searchParams.get('sort') || 'createdAt'
   });

   const handleFilter = () => {
      const params = new URLSearchParams(window.location.search);

      params.set('fromPrice', filter.fromPrice.toString());
      params.set('toPrice', filter.toPrice.toString());
      params.set('sort', filter.sort.toString());
      params.set('page', filter.page.toString());
      // params.set('limit', filter.limit.toString());

      const newUrl = `${pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
   };

   return (
      <div className={'section sticky top-[calc(64px+16px)] flex flex-col gap-2 bg-white p-3'}>
         <BlockFilter title='Khoảng giá' border>
            <div className='mb-2 flex items-center'>
               <DisplayPrice price={filter.fromPrice} />
               <Divider className='w-2' />
               <DisplayPrice price={filter.toPrice} />
            </div>
            <Slider
               showTooltip
               aria-label='Khoảng giá'
               size='sm'
               minValue={0}
               maxValue={20000000}
               onChange={(value) =>
                  setFilter((prev) => ({ ...prev, fromPrice: value[0], toPrice: value[1] }))
               }
               value={[filter.fromPrice, filter.toPrice]}
               defaultValue={[filter.fromPrice, filter.toPrice]}
               tooltipProps={{
                  placement: 'bottom'
               }}
            />
         </BlockFilter>
         <BlockFilter title='Sắp xếp' border>
            <RadioGroup
               size='sm'
               defaultValue={filter.sort}
               onValueChange={(value) => setFilter((prev) => ({ ...prev, sort: value }))}
            >
               <Radio value='createdAt'>Ngày ra mắt</Radio>
               <Radio value='price-asc'>Gía tăng đần</Radio>
               <Radio value='price-desc'>Giá giảm dần</Radio>
               <Radio value='populate'>Bán chạy</Radio>
            </RadioGroup>
         </BlockFilter>
         <BlockFilter className='flex justify-end gap-2' wrapperClassName='pb-0'>
            {/* <Button size='sm' variant='bordered' className='border-1 rounded'>
               Xoá bộ lọc
            </Button> */}
            <Button size='sm' color='primary' className='rounded' onClick={handleFilter}>
               Áp dụng
            </Button>
         </BlockFilter>
      </div>
   );
};

export default Fillterbar;
