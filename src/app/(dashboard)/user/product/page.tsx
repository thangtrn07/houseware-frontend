'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Pagination,
   useDisclosure,
   Spinner,
   Input,
   Avatar,
   Button,
   AvatarGroup,
   Chip
} from '@nextui-org/react';
import { CirclePlus, Eye, RotateCcw, Search, SquarePen, Trash2 } from 'lucide-react';
import ButtonUI from '~/components/ButtonUI';
import ModalUI, { ModalType } from '~/components/ModalUI';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from './_fetch';
import EmptyStates from '~/components/EmptyStates';
import FormHandler from './_components/FormHandler';
import { IPagination } from '~/interfaces/pagination.interfaces';
import tw from '~/lib/tw';
import { IProduct } from '~/interfaces/schema.interfaces';
import Link from 'next/link';
import formatPrice from '~/utils/formatPrice';
import { toast } from 'react-toastify';

const formId = 'submit-product';

export interface ProductQueryData {
   result: IProduct[];
   pagination: IPagination;
}

const ProductPage = () => {
   // -------------- state --------------
   const [payload, setPayload] = useState<IProduct | undefined>();
   const [modalType, setModalType] = useState<ModalType>(null);
   const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

   const [pagination, setPagination] = useState<IPagination>({
      page: 1,
      limit: 20
   });

   const filterRef = useRef<HTMLInputElement>(null);
   const [filter, setFiter] = useState<string>('');

   const { data, isLoading, isRefetching, refetch } = useQuery<ProductQueryData>({
      queryKey: ['/category', pagination, filter],
      queryFn: () => fetchProducts({ page: pagination.page, limit: pagination.limit, filter }),
      placeholderData: keepPreviousData
   });

   useEffect(() => {
      if (data?.pagination) {
         setPagination((prev) => ({ ...prev, ...data?.pagination }));
      }
   }, [data?.pagination]);

   const createMutation = useMutation({
      mutationFn: (data) => {
         return createProduct(data);
      },
      onSuccess: () => {
         refetch();
         onClose();
         toast.success('Tạo mới thành công.');
      },
      onError: () => {
         refetch();
         onClose();
         toast.error('Đã có lỗi vui lòng thử lại sau.');
      }
   });

   const updateMutation = useMutation({
      mutationFn: (data) => {
         return updateProduct(data as any);
      },
      onSuccess: () => {
         refetch();
         onClose();
         toast.success('Cập nhật thành công.');
      },
      onError: () => {
         refetch();
         onClose();
         toast.error('Đã có lỗi vui lòng thử lại sau.');
      }
   });

   const deleteMutation = useMutation({
      mutationFn: (data) => {
         return deleteProduct(data);
      },
      onSuccess: () => {
         refetch();
         onClose();
         toast.success('Xoá thành công.');
      },
      onError: () => {
         refetch();
         onClose();
         toast.error('Đã có lỗi vui lòng thử lại sau.');
      }
   });

   // -------------- handler --------------

   const handleOpen = (modalType?: ModalType, payload?: IProduct) => {
      setModalType(modalType);
      if (payload) {
         setPayload(payload);
      }
      onOpen();
   };

   const handleCreate = (data: any) => {
      createMutation.mutate(data);
   };

   const handleUpdate = (data: any) => {
      updateMutation.mutate(data);
   };

   const handleDelete = (e: React.FormEvent) => {
      e.preventDefault();
      deleteMutation.mutate(payload?._id as any);
   };

   const renderModal = (modalType: ModalType) => {
      if (modalType === 'delete') {
         return (
            <form id={formId} onSubmit={handleDelete}>
               Bạn có chặc muốn xoá danh mục <span className='font-bold'>{payload?.name}</span> này?
            </form>
         );
      } else {
         const handleSubmit = (data: any) => {
            if (modalType === 'create') {
               handleCreate(data);
            } else if (modalType === 'edit') {
               handleUpdate(data);
            }
         };
         return (
            <FormHandler
               formId={formId}
               onSubmit={handleSubmit}
               type={modalType}
               payload={payload}
            />
         );
      }
   };

   return (
      <>
         <section className='section-card mb-4 flex flex-col justify-between gap-3 md:flex-row'>
            <div className='flex gap-3'>
               <ButtonUI
                  startContent={<RotateCcw size={16} />}
                  color='primary'
                  className='bg-[--green-color]'
                  onClick={() => refetch()}
               >
                  Làm mới
               </ButtonUI>

               <Link href='/user/product/create'>
                  <ButtonUI startContent={<CirclePlus size={16} />} color='primary'>
                     Thêm mới
                  </ButtonUI>
               </Link>
            </div>
            <div className='flex gap-2'>
               <Input
                  ref={filterRef}
                  className='max-w-80'
                  placeholder='Tìm kiếm sản phẩm'
                  startContent={<Search size={20} />}
               />
               <Button
                  isIconOnly
                  type='submit'
                  color='primary'
                  onClick={() => setFiter(filterRef.current?.value as string)}
               >
                  <Search size={16} />
               </Button>
            </div>
         </section>
         <Table
            aria-label='Category table'
            isHeaderSticky
            bottomContent={
               <div className='flex w-full justify-end'>
                  <Pagination
                     showControls
                     className={tw(!data && 'invisible')}
                     page={Number(data?.pagination?.page) || 1}
                     total={Number(data?.pagination?.totalPage) || 1}
                     onChange={(page) => setPagination((prev) => ({ ...prev, page: page }))}
                  />
               </div>
            }
            classNames={{
               wrapper: 'rounded-md',
               table: 'min-w-[600px]'
            }}
         >
            <TableHeader>
               <TableColumn width='10%'>_id</TableColumn>
               <TableColumn>Tên sản phẩm</TableColumn>
               <TableColumn width='30%'>Danh mục</TableColumn>
               <TableColumn width='20%'>Hình ảnh</TableColumn>
               <TableColumn>Giá</TableColumn>
               <TableColumn>Số lượng</TableColumn>
               <TableColumn width={136}>Thao tác</TableColumn>
            </TableHeader>
            <TableBody
               items={data?.result || []}
               isLoading={isLoading || isRefetching}
               loadingContent={<Spinner label='Loading...' />}
               emptyContent={<EmptyStates />}
            >
               {(item) => (
                  <TableRow key={item?._id}>
                     <TableCell>{item?._id}</TableCell>
                     <TableCell>{item?.name}</TableCell>
                     <TableCell>{item?.category?.name}</TableCell>
                     <TableCell>
                        <AvatarGroup isBordered className='!justify-start'>
                           {item?.images?.map((image) => (
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
                           {formatPrice(item?.price)}
                        </Chip>
                     </TableCell>
                     <TableCell>
                        <Chip isDisabled color='primary'>
                           {item?.quantity}
                        </Chip>
                     </TableCell>
                     <TableCell>
                        <div className='flex gap-2'>
                           <ButtonUI
                              tooltip='Xem chi tiết'
                              isIconOnly
                              color='primary'
                              className='bg-yellow-400'
                              size='sm'
                              onClick={() => handleOpen('view', item)}
                           >
                              <Eye size={18} />
                           </ButtonUI>
                           <ButtonUI
                              isIconOnly
                              tooltip='Sửa'
                              color='primary'
                              className='bg-[--orange-color]'
                              size='sm'
                              onClick={() => handleOpen('edit', item)}
                           >
                              <SquarePen size={18} />
                           </ButtonUI>

                           <ButtonUI
                              isIconOnly
                              tooltip='Xoá'
                              color='primary'
                              className='bg-[--red-color]'
                              size='sm'
                              onClick={() => handleOpen('delete', item)}
                           >
                              <Trash2 size={18} />
                           </ButtonUI>
                        </div>
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>

         <ModalUI
            headerTitle={{
               view: 'Chi tiết sản phẩm',
               create: 'Tạo sản phẩm',
               edit: 'Cập nhật sản phẩm',
               delete: 'Xoá sản phẩm'
            }}
            size='5xl'
            modalType={modalType}
            isOpen={isOpen}
            onOpenChange={(isOpen) => {
               onOpenChange();
               if (isOpen === false) {
                  setModalType(undefined);
                  setPayload(undefined);
               }
            }}
            isLoading={
               createMutation.isPending || deleteMutation.isPending || updateMutation.isPending
            }
            formId={formId}
         >
            {renderModal}
         </ModalUI>
      </>
   );
};

export default ProductPage;
