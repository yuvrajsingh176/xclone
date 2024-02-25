'use client'
// Import necessary dependencies
import {
    QueryClient,
    QueryClientProvider
  } from '@tanstack/react-query';
import { ReactNode } from 'react';
  
  const queryClient = new QueryClient();
  
  const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            
{children}
</QueryClientProvider>
    );
  };
  
  export default Provider;
  