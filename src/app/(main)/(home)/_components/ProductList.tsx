import React from 'react';
import ProductCard from '~/app/(main)/_components/ProductCard/ProductCard';
import { IProduct } from '~/interfaces/schema.interfaces';

interface ProductListProps {
   title: string;
   products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
   return (
      <section className='section border-none bg-transparent'>
         <h3 className='mb-3 text-2xl font-bold'>{title}</h3>
         <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6'>
            {products.map((item) => (
               <ProductCard key={item._id} {...item} />
            ))}
         </ul>
      </section>
   );
};

export default ProductList;
