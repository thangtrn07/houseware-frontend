'use client';
import React, { useCallback } from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import Link from 'next/link';
import tw from '~/lib/tw';
import { IBreadcrumb } from '~/interfaces/breadcrumb.interfaces';

interface BreadcrumbProps {
   data: IBreadcrumb[] | string[];
   className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ data, className }) => {
   const checkIsStringArray = (arr: any[]) => {
      return arr.every((item) => typeof item === 'string');
   };

   const renderBreadcumbItem = useCallback(() => {
      if (!data) {
         return null;
      } else if (checkIsStringArray(data)) {
         return (data as string[]).map((item, index) => (
            <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
         ));
      } else {
         return (data as IBreadcrumb[]).map((item, index) => (
            <BreadcrumbItem key={index}>
               {item.href ? <Link href={item.href}>{item.content}</Link> : item.content}
            </BreadcrumbItem>
         ));
      }
   }, [data]);

   return (
      <Breadcrumbs className={tw(className)}>
         <BreadcrumbItem key={'root'}>
            <Link href='/'>Trang chủ</Link>
         </BreadcrumbItem>
         {renderBreadcumbItem()}
      </Breadcrumbs>
   );
};

export default Breadcrumb;
