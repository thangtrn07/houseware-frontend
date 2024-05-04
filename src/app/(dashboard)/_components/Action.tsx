'use client';
import {
   Avatar,
   Badge,
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger
} from '@nextui-org/react';
import React, { useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import ButtonUI from '~/components/ButtonUI';
import Link from 'next/link';
import Notification from '~/app/(dashboard)/_components/Notification';
import useStores from '~/stores/stores';
import { Roles } from '~/interfaces';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '~/axios/axiosInstance';
import { toast } from 'react-toastify';
import { queryClient } from '~/provider/QueryProvider';

const Action = () => {
   const { user, cart } = useStores();

   const { mutate } = useMutation({
      mutationFn: () => axiosInstance.get('/auth/logout'),
      onSuccess: async () => {
         await queryClient.refetchQueries({
            queryKey: ['/auth/me']
         });
         toast.success('Đăng xuất thành công.');
      },
      onError: () => {
         toast.error('Đã có lỗi vui lòng thử lại sau.');
      }
   });

   const handleActionChange = (key) => {
      if (key === 'logout') {
         mutate();
      }
   };

   return (
      <div className='flex items-center gap-4'>
         {user ? (
            <>
               <Link href='/cart'>
                  <Badge content={cart?.length} color='danger'>
                     <Button isIconOnly radius='full' variant='flat' size='md'>
                        <ShoppingCart className='fill-current' size={24} />
                     </Button>
                  </Badge>
               </Link>
               <div className='flex gap-4'>
                  {user?.role === Roles.ADMIN && <Notification />}

                  <Dropdown showArrow placement='bottom-end' className='rounded-md'>
                     <DropdownTrigger>
                        <Avatar
                           as='button'
                           className='border-2 border-[--blue-color] transition-transform'
                           src='/assets/default-avatar.jpg'
                        />
                     </DropdownTrigger>
                     <DropdownMenu
                        aria-label='Static Actions'
                        variant='flat'
                        itemClasses={{ base: 'rounded' }}
                        selectionMode='none'
                        onAction={handleActionChange}
                     >
                        <DropdownItem key='info' href='/user'>
                           Thông tin cá nhân
                        </DropdownItem>
                        <DropdownItem key='purchase' href='/user/purchase'>
                           Đơn hàng đã mua
                        </DropdownItem>
                        <DropdownItem key='logout'>Đăng xuất</DropdownItem>
                     </DropdownMenu>
                  </Dropdown>
               </div>
            </>
         ) : (
            <ButtonUI color='primary' radius='sm'>
               <Link href='/login'>Đăng nhập</Link>
            </ButtonUI>
         )}
      </div>
   );
};

export default Action;
