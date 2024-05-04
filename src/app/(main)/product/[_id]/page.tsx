import React from 'react';
import { notFound } from 'next/navigation';
import { ServerProps } from '~/interfaces/server.interfaces';
import Breadcrumb from '../../_components/Breadcrumb';
import EmblaCarousel from './_components/EmblaCarousel';
import BadgeUI from '~/components/BadgeUI';
import { Check, X, Store, ShoppingBag } from 'lucide-react';
import formatPrice from '~/utils/formatPrice';
import Table from './_components/Table';
import ActionGroup from './_components/ActionGroup';
import ProductCard from '~/app/(main)/_components/ProductCard/ProductCard';
import EmptyStates from '~/components/EmptyStates';
import { fetchProductById } from './_fetch';
import { IProduct } from '~/interfaces/schema.interfaces';
import Description from './_components/Description';

const ProductDetailPage: React.FC<ServerProps> = async ({ params }) => {
   const productData: IProduct = await fetchProductById(params?._id);
   // const suggestionData: IProduct[] = await fetchProductSuggestion();

   return (
      <>
         <Breadcrumb data={['Sản phẩm', 'Áo thun']} className='mb-4' />
         <section className='section-card mb-4 flex flex-col gap-4 md:flex-row'>
            <div className='flex md:basis-4/12 md:border-r md:border-[--gray-300-color] md:pr-4'>
               <EmblaCarousel slides={productData?.images?.map((item) => item.imageUrl) || []} />
            </div>
            <div className='space-y-2 md:basis-8/12'>
               <BadgeUI
                  text={productData.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                  color={productData.quantity > 0 ? 'success' : 'danger'}
                  variant='flat'
                  startIcon={productData.quantity > 0 ? <Check size={18} /> : <X size={18} />}
                  classNames={{ base: 'rounded-md' }}
               />

               <h1 className='line-clamp-3 text-2xl font-medium'>{productData.name}</h1>

               <ul className='text-md flex items-center text-[#8b96a5]'>
                  <li className='flex items-center gap-1'>
                     <Store size={18} /> Còn {productData.quantity}
                  </li>
                  <div className='mx-3 h-4 w-[2px] bg-[--gray-300-color]' />
                  <li className='flex items-center gap-1'>
                     <ShoppingBag size={18} /> Đã bán {productData.sold}
                  </li>
               </ul>

               <h4 className='text-2xl font-medium text-[--red-color]'>
                  Giá: {formatPrice(productData?.price)}
               </h4>

               <ActionGroup data={productData} />

               <div className='!mt-5 border-t border-dashed pt-3'>
                  <h4 className='mb-2 text-xl font-medium'>Thông tin chi tiết</h4>
                  <Table data={productData.detail} />
               </div>
            </div>
         </section>
         <section className='flex flex-col gap-4 md:flex-row'>
            <div className='md:basis-9/12'>
               <div className='section-card description-product'>
                  <h1 className='mb-2 text-xl font-medium'>Mô tả sản phẩm</h1>
                  {productData?.description ? (
                     // <div dangerouslySetInnerHTML={{ __html: productData?.description || '' }} />
                     <Description description={productData?.description} />
                  ) : (
                     <EmptyStates subtitle='Mô tả sản phẩm trống' />
                  )}
               </div>
            </div>
            <div className='md:basis-3/12'>
               <div className='section-card'>
                  {/* sticky top-[calc(64px+16px)] */}
                  <h1 className='mb-2 text-xl font-medium'>Sản phẩm tương tự</h1>
                  {/* <ul className='space-y-4'>
                     {suggestionData.slice(0, 6).map((item) => (
                        <ProductCard key={item._id} {...item} />
                     ))}
                  </ul> */}
                  <EmptyStates />
               </div>
            </div>
         </section>
      </>
   );
};

export default ProductDetailPage;
