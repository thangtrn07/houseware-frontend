'use client';
import {
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Badge
} from '@nextui-org/react';
import { Bell } from 'lucide-react';
import React from 'react';

const Notification = () => {
   return (
      <Dropdown placement='bottom-end' className='w-64 rounded-md'>
         <Badge content={null} color='danger'>
            <DropdownTrigger>
               <Button isIconOnly radius='full' variant='flat' size='md'>
                  <Bell size={20} />
               </Button>
            </DropdownTrigger>
         </Badge>
         <DropdownMenu aria-label='Static Actions' variant='flat' itemClasses={{ base: 'rounded' }}>
            <DropdownItem key='new'>New file</DropdownItem>
            <DropdownItem key='copy'>Copy link</DropdownItem>
            <DropdownItem key='edit'>Edit file</DropdownItem>
            <DropdownItem key='delete' className='text-danger' color='danger'>
               Delete file
            </DropdownItem>
         </DropdownMenu>
      </Dropdown>
   );
};

export default Notification;
