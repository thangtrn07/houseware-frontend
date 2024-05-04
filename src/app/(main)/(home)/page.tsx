import React from 'react';
import Category from './_components/Category';
import EmblaCarousel from './_components/EmblaCarousel';
import BlockCategoryGroup from './_components/BlockCategoryGroup';
import { SLIDES_IMAGE_URL, CATEGORY_BLOCK_DATA, PRODUCT_LIST, CATEGORIES } from './_data';
import ProductList from './_components/ProductList';
import { fetchHome } from './_fetch';
import { ICategory } from '~/interfaces/schema.interfaces';

const HomePage = async () => {
   const homeData = await fetchHome();

   return (
      <>
         {/* CAROUSEL */}
         <section className='section flex py-4'>
            {/* CATEGORY */}
            <Category
               categories={homeData?.categories?.map((item: ICategory) => ({
                  href: `/search?query=${item?.name}`,
                  content: item?.name
               }))}
            />

            {/* CAROUSEL */}
            <div className='pl-4 pr-4 md:basis-9/12 md:pl-0'>
               <EmblaCarousel slides={SLIDES_IMAGE_URL} />
            </div>
         </section>

         {/* BLOCK ITEMS GROUP */}
         <BlockCategoryGroup
            title={CATEGORY_BLOCK_DATA.title}
            thumbnail={CATEGORY_BLOCK_DATA.thumbnail}
            categoryItems={homeData?.categories?.slice(0, 8).map((item: ICategory) => ({
               href: `/search?query=${item?.name}`,
               image: item?.image?.imageUrl,
               title: item?.name
            }))}
         />

         {/* LIST PRODUCT */}
         <ProductList title={PRODUCT_LIST.title} products={homeData?.newProducts || []} />

         <ProductList title='Sản phẩm bán chạy' products={homeData?.populateProducts || []} />
      </>
   );
};

export default HomePage;
