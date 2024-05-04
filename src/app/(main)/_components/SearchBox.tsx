'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Divider } from '@nextui-org/react';
import { Search, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounceValue } from 'usehooks-ts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchProductSearch } from '../product/[_id]/_fetch';
import { IProduct } from '~/interfaces/schema.interfaces';
import { IPagination } from '~/interfaces/pagination.interfaces';
import { useRouter } from 'next/navigation';

interface SuggestItemProps {
   content: string;
   href?: string;
}

const SuggestItem: React.FC<SuggestItemProps> = ({ content, href = '/' }) => {
   return (
      <Link
         href={href}
         className='transition-linear flex items-center px-4 py-2 hover:bg-[--gray-300-color]'
      >
         <Search size={20} className='flex-shrink-0' />
         <span className='ml-2 truncate'>{content}</span>
      </Link>
   );
};

export interface SearcgQueryData {
   result: IProduct[];
   pagination: IPagination;
}

const SearchBox = () => {
   const router = useRouter();
   const [visible, setVisible] = useState<boolean>(false);
   const [searchText, setSearchText] = useDebounceValue('', 400);

   const { data: searchProductData } = useQuery<SearcgQueryData>({
      queryKey: ['search-suggestion', searchText],
      queryFn: () => fetchProductSearch({ name: searchText, page: 1, limit: 10 } as any),
      placeholderData: keepPreviousData,
      staleTime: 400,
      enabled: searchText.length > 0
   });

   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/search?query=${searchText}`);
   };

   const show = () => setVisible(true);
   const hide = () => setVisible(false);

   return (
      <div className='relative hidden w-full max-w-lg md:block'>
         <form className='flex' onSubmit={handleSearch}>
            <input
               onFocus={show}
               onBlur={hide}
               defaultValue={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               placeholder='Tìm kiếm sản phẩm'
               type='text'
               className='h-10 w-full rounded-s-md border-2 border-[--blue-color] px-3 py-2 text-sm outline-none'
            />
            <Button type='submit' color='primary' radius='none' className='rounded-e-md'>
               Tìm kiếm
            </Button>
         </form>

         {/* SUGGEST LIST */}
         <AnimatePresence>
            {visible && (
               <motion.div
                  initial={{ opacity: 0, translateY: '0' }}
                  animate={{ opacity: 1, translateY: '12px' }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                  className='header__dropdown_shadow absolute inset-x-0 top-full w-full rounded-lg border border-[var(--gray-300-color)] bg-white'
               >
                  <ul className='max-h-[80vh] overflow-y-auto py-2 text-sm'>
                     <div className='flex items-center overflow-hidden text-nowrap px-4 py-2 transition-all ease-linear'>
                        <Store size={20} className='flex-shrink-0' />
                        <span className='ml-2'>Tìm kiếm &quot;</span>
                        <span className='truncate font-bold text-[--red-color]'>{searchText}</span>
                        <span>&quot;</span>
                     </div>
                     {searchText.length > 0 && (
                        <>
                           <Divider />
                           {searchProductData?.result?.map((item) => (
                              <SuggestItem
                                 content={item?.name}
                                 key={item._id}
                                 href={`/search?query=${item?.name}`}
                              />
                           ))}
                        </>
                     )}
                  </ul>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default SearchBox;
