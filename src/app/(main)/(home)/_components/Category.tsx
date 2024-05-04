import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CategoryItemProps {
   href: string;
   content: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ href, content }) => {
   return (
      <li>
         <Link
            href={href}
            className='transition-ease group flex h-10 items-center justify-between rounded-md px-3 text-base hover:bg-[--light-sky-color]'
         >
            {content}
            <ChevronRight size={22} className='transition-ease group-hover:translate-x-2 ' />
         </Link>
      </li>
   );
};

interface CategoryProps {
   categories: CategoryItemProps[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
   return (
      <ul className='hidden px-4 md:block md:basis-3/12'>
         {categories?.map((category, index) => (
            <CategoryItem key={index} href={category.href} content={category.content} />
         ))}
      </ul>
   );
};

export default Category;
