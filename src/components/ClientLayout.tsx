'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import axiosInstance from '~/axios/axiosInstance';
import useStores from '~/stores/stores';
import { LoadingOverState } from './LoadingState';
import { usePathname, useRouter } from 'next/navigation';

interface ClientLayoutProps {
   children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
   const pathname = usePathname();
   const router = useRouter();
   const { setUser } = useStores();
   const { data, isLoading, isRefetching, isFetched } = useQuery({
      queryKey: ['/auth/me'],
      queryFn: async () => {
         const res = await axiosInstance.get('/auth/me');
         return res?.data?.metadata;
      }
   });

   useEffect(() => {
      setUser(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

   useEffect(() => {
      if (isFetched && pathname.includes('/user') && !data) {
         router.push('/');
      }
      if (isFetched && pathname.includes('/cart') && !data) {
         router.push('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, pathname, isFetched]);

   return (
      <>
         {(isLoading || isRefetching) && <LoadingOverState />}
         {children}
      </>
   );
};

export default ClientLayout;
