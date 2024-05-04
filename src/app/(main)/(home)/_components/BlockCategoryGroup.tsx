import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BlockCategoryCardProps {
   href: string;
   image: string;
   title: string;
}

const BlockCategoryCard: React.FC<BlockCategoryCardProps> = ({ href, image = '', title }) => {
   return (
      <Link
         href={href}
         className='flex cursor-pointer items-center gap-2 p-2 outline outline-1 outline-[--gray-300-color] transition-colors hover:text-[--red-color]'
      >
         <picture className='image-cover h-24 w-24 flex-none'>
            <Image width={512} height={512} src={image} alt='' />
         </picture>
         <h4 className='font-medium'>{title}</h4>
      </Link>
   );
};

interface BlockCategoryGroupProps {
   title: string;
   thumbnail: string;
   categoryItems: BlockCategoryCardProps[];
}

const BlockCategoryGroup: React.FC<BlockCategoryGroupProps> = ({
   title,
   thumbnail,
   categoryItems
}) => {
   return (
      <section className='section flex flex-col overflow-hidden md:flex-row'>
         <div className='relative flex aspect-square basis-3/12 items-center justify-center'>
            <picture className='image-cover absolute inset-0'>
               <Image width={600} height={600} src={thumbnail} alt='' />
            </picture>
            <h3 className='z-10 w-4/5 text-wrap text-center text-lg font-medium drop-shadow-md'>
               {title}
            </h3>
         </div>
         <div className='grid-row-2 grid flex-grow basis-9/12 grid-cols-2 gap-[1px] md:grid-cols-3 lg:grid-cols-4'>
            {categoryItems?.map((item, index) => <BlockCategoryCard key={index} {...item} />)}
         </div>
      </section>
   );
};

export default BlockCategoryGroup;
