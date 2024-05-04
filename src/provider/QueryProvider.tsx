'use client';
import React from 'react';
import { LayoutProps } from '~/interfaces/layout.interfaces';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
         retry: false
         // staleTime: 5 * 60 * 1000
      }
   }
});

const QueryProvider: React.FC<LayoutProps> = ({ children }) => {
   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
};

export default QueryProvider;
