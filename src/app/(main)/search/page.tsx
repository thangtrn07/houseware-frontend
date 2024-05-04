"use client";
import React, { Suspense } from "react";
import Breadcrumb from "../_components/Breadcrumb";
import ProductList from "./_components/ProductList";
import Fillterbar from "./_components/Fillterbar";
import LoadingState from "~/components/LoadingState";

const SearchPage = () => {
   return (
      <>
         <Breadcrumb data={["Tìm kiếm"]} className="mb-5" />
         <div className="flex flex-col gap-2 md:flex-row">
            <nav className="md:basis-2/12">
               <Suspense fallback={<LoadingState />}>
                  <Fillterbar />
               </Suspense>
            </nav>
            <div className="md:basis-10/12">
               <Suspense fallback={<LoadingState />}>
                  <ProductList />
               </Suspense>
            </div>
         </div>
      </>
   );
};

export default SearchPage;
