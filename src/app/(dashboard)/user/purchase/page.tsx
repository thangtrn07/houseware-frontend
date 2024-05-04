'use client';
import React, { useState } from 'react';
import { Accordion, Pagination, Select, SelectItem } from '@nextui-org/react';
import {
   AccordionItem,
   Avatar,
   AvatarGroup,
   Chip,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   User
} from '@nextui-org/react';
import formatPrice from '~/utils/formatPrice';
import ButtonUI from '~/components/ButtonUI';
import { RotateCcw } from 'lucide-react';
import tw from '~/lib/tw';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { IPagination } from '~/interfaces/pagination.interfaces';
import { IOrder } from '~/interfaces/schema.interfaces';
import LoadingState from '~/components/LoadingState';
import { fetchOrder } from '../order/_fetch';
import { formatFullDate } from '~/utils/formatBaseDate';
import { getStatusColor, getStatusText } from '~/utils/orderStatus';

export const orderStatus = [
   {
      label: 'Đang chờ duyệt',
      value: 'pending'
   },
   {
      label: 'Đang đóng gói',
      value: 'processing'
   },
   {
      label: 'Đang vận chuyển',
      value: 'shipping'
   },
   {
      label: 'Đã giao hàng',
      value: 'delivered'
   },
   {
      label: 'Đã huỷ',
      value: 'cancelled'
   }
];

interface OrderQueryData {
   result?: IOrder[] | undefined;
   pagination: IPagination;
}

const PurchasePage = () => {
   const [pagination, setPagination] = useState<IPagination>({
      page: 1,
      limit: 10
   });

   const orderBy = '663249c40eb13ce23fb688d0';

   const { data, isLoading, isRefetching, refetch } = useQuery<OrderQueryData>({
      queryKey: ['/order', pagination, orderBy],
      queryFn: () =>
         fetchOrder({ page: pagination.page, limit: pagination.limit, orderBy: orderBy }),
      placeholderData: keepPreviousData
   });

   return (
      <section className='section space-y-3 border-none bg-transparent'>
         <div className='section-card flex items-center justify-between gap-3'>
            <ButtonUI
               startContent={<RotateCcw size={16} />}
               color='primary'
               className='bg-[--green-color]'
               onClick={() => refetch()}
            >
               Làm mới
            </ButtonUI>
         </div>
         {isLoading || isRefetching ? (
            <LoadingState />
         ) : (
            <>
               <Accordion variant='splitted' className='px-0'>
                  {(data?.result ? data.result : []).map((item) => (
                     <AccordionItem
                        key={item?._id}
                        aria-label='Accordion 1'
                        title={
                           <div className='flex items-center justify-between pl-2'>
                              <User
                                 name={item?.orderBy?.fullname}
                                 description={item?.orderBy.role}
                                 avatarProps={{
                                    src: item?.orderBy?.image,
                                    isBordered: true
                                 }}
                              />
                              <Chip color={getStatusColor(item?.status) as any}>
                                 {getStatusText(item?.status)}
                              </Chip>
                           </div>
                        }
                        subtitle={
                           <div className='mt-3 grid gap-1 pl-2 md:grid-cols-2'>
                              <ul className='space-y-1'>
                                 <li>
                                    <span className='font-bold'>Mã đơn hàng:</span> {item?._id}
                                 </li>
                                 <li>
                                    <span className='font-bold'>Ngày đặt:</span>{' '}
                                    {formatFullDate(item?.createdAt)}
                                 </li>
                                 <li>
                                    <span className='font-bold'>Tổng tiền:</span>{' '}
                                    {formatPrice(item?.totalPrice)}
                                 </li>
                                 <li>
                                    <span className='font-bold'>Trạng thái:</span>{' '}
                                    {getStatusText(item?.status)}
                                 </li>
                              </ul>
                              <ul className='space-y-1'>
                                 <li>
                                    <span className='font-bold'>Số điện thoại:</span> {item?.phone}
                                 </li>
                                 <li className='line-clamp-3' title={item?.address}>
                                    <span className='font-bold'>Địa chỉ giao hàng:</span>{' '}
                                    {item?.address}
                                 </li>
                                 <li className='line-clamp-3' title={item?.note}>
                                    <span className='font-bold'>Ghi chú:</span> {item?.note}
                                 </li>
                              </ul>
                           </div>
                        }
                     >
                        <div className='space-y-4 p-1'>
                           <div className='flex items-end justify-between'>
                              <h3 className='text-lg'>
                                 <span className='font-bold'>Tổng tiền:</span>
                                 {formatPrice(item?.totalPrice)}
                              </h3>
                           </div>
                           <Table
                              aria-label='table'
                              isHeaderSticky
                              classNames={{
                                 wrapper: 'rounded-md',
                                 table: 'min-w-[600px]'
                              }}
                              color='primary'
                           >
                              <TableHeader>
                                 <TableColumn width='10%'>_id</TableColumn>
                                 <TableColumn>Tên sản phẩm</TableColumn>
                                 <TableColumn width='20%'>Hình ảnh</TableColumn>
                                 <TableColumn>Giá</TableColumn>
                                 <TableColumn>Số lượng</TableColumn>
                                 <TableColumn>Tổng tiền</TableColumn>
                              </TableHeader>
                              <TableBody items={item.items || []}>
                                 {(product) => (
                                    <TableRow key={product?._id}>
                                       <TableCell>{product?._id}</TableCell>
                                       <TableCell>{product?.product?.name}</TableCell>
                                       <TableCell>
                                          <AvatarGroup isBordered className='!justify-start'>
                                             {product?.product?.images?.map((image) => (
                                                <Avatar
                                                   key={image?._id}
                                                   src={image?.imageUrl}
                                                   isBordered
                                                   radius='sm'
                                                   className='text-large h-16 w-16'
                                                />
                                             ))}
                                          </AvatarGroup>
                                       </TableCell>
                                       <TableCell>
                                          <Chip isDisabled color='primary'>
                                             {formatPrice(product?.price)}
                                          </Chip>
                                       </TableCell>
                                       <TableCell>
                                          <Chip isDisabled color='primary'>
                                             {product?.quantity}
                                          </Chip>
                                       </TableCell>
                                       <TableCell>
                                          {formatPrice(product.price * product.quantity)}
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </TableBody>
                           </Table>
                        </div>
                     </AccordionItem>
                  ))}
               </Accordion>

               <div className='flex w-full justify-end'>
                  <Pagination
                     showControls
                     classNames={{ item: 'bg-white' }}
                     className={tw(!data && 'invisible')}
                     page={Number(data?.pagination?.page) || 1}
                     total={Number(data?.pagination?.totalPage) || 1}
                     onChange={(page) => setPagination((prev) => ({ ...prev, page: page }))}
                  />
               </div>
            </>
         )}
      </section>
   );
};

export default PurchasePage;
