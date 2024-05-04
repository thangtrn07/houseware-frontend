'use client';
import { LayoutGrid, NotepadText, Package, ShoppingCart, User, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import tw from '~/lib/tw';
import useStores from '~/stores/stores';
import { getRoleText } from '~/utils/rolesState';

export interface SidebarItemProps {
   href: string;
   icon: React.ReactNode;
   label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label }) => {
   const pathName = usePathname();

   return (
      <li>
         <Link
            href={href}
            className={tw(
               'transition-linear group flex h-10 items-center rounded-md p-2 text-gray-900 hover:bg-[--gray-300-color]',
               pathName === href && 'bg-[--gray-300-color]'
            )}
         >
            {icon}
            <span className='ms-3 text-sm font-medium'>{label}</span>
         </Link>
      </li>
   );
};

const adminSidebar = (role: string) => {
   if (!role || role !== 'admin') {
      return [];
   }
   return [
      {
         href: '/user/category',
         icon: <LayoutGrid size={20} />,
         label: 'Danh mục'
      },
      {
         href: '/user/product',
         icon: <Package size={20} />,
         label: 'Sản phẩm'
      },
      {
         href: '/user/order',
         icon: <ShoppingCart size={20} />,
         label: 'Đơn hàng'
      },
      {
         href: '/user/accounts',
         icon: <Users size={20} />,
         label: 'Tài khoản'
      }
   ];
};

const Sidebar = ({ showSidebar }: { showSidebar: boolean }) => {
   const user = useStores((state) => state.user);

   const items = [
      {
         href: '/user',
         icon: <User size={20} />,
         label: 'Thông tin cá nhân'
      },
      {
         href: '/user/purchase',
         icon: <NotepadText size={20} />,
         label: 'Đơn hàng đã mua'
      },
      // admin
      ...adminSidebar(user?.role as string)
   ];

   return (
      <aside
         className={tw(
            'transition-linear fixed bottom-0 left-0 top-[--header-height] z-10 h-[calc(100vh-var(--header-height))] w-[--sidebar-width] -translate-x-full overflow-y-auto border-r border-[--gray-300-color] bg-white lg:translate-x-0',
            showSidebar && 'translate-x-0'
         )}
      >
         <div className='h-full overflow-y-auto px-3 py-4'>
            <nav className='flex flex-col items-center gap-2'>
               <picture className='image-cover border-item h-16 w-16 rounded-full'>
                  <Image
                     width={300}
                     height={300}
                     src='/assets/default-avatar.jpg'
                     alt='avatar image'
                  />
               </picture>
               <div className='cursor-default text-center'>
                  <h3 className='hover:text-primary transition-ease line-clamp-2 text-base font-medium'>
                     {user?.fullname}
                  </h3>
                  <span className='block text-xs text-[--gray-600-color]'>
                     {getRoleText(user?.role as string)}
                  </span>
               </div>
            </nav>
            <hr className='my-3 border-dashed border-[--gray-300-color]' />
            <ul className='space-y-2 font-medium'>
               {items.map((item) => (
                  <SidebarItem
                     key={item.href}
                     icon={item.icon}
                     href={item.href}
                     label={item.label}
                  />
               ))}
            </ul>
         </div>
      </aside>
   );
};

export default Sidebar;
