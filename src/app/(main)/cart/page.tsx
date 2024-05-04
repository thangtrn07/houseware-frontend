'use client';
import React, { useMemo } from 'react';
import Breadcrumb from '../_components/Breadcrumb';
import CartList from './_components/CartList';
import InputUI from '~/components/InputUI';
import { useForm } from 'react-hook-form';
import ButtonUI from '~/components/ButtonUI';
import formatPrice from '~/utils/formatPrice';
import useStores from '~/stores/stores';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '~/app/(dashboard)/user/order/_fetch';
import { toast } from 'react-toastify';

const CartPage = () => {
   const { cart, user, removeCart } = useStores();
   const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset
   } = useForm();

   const totalPrice = useMemo(() => {
      const _ids = Array.from(selectedKeys) as string[];

      const price = cart
         .filter((item) => _ids.includes(item.product._id))
         .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

      return price;
   }, [selectedKeys, cart]);

   const mutation = useMutation({
      mutationFn: (data) => createOrder(data as any),
      onSuccess: () => {
         reset();
         removeCart(Array.from(selectedKeys));
         setSelectedKeys(new Set([]));
         toast.success('Đã đặt hàng thành công.');
      }
   });

   const onSubmit = (data: any) => {
      if (!user) {
         return toast.warn('Vui lòng đăng nhập.');
      }
      const _ids = Array.from(selectedKeys) as string[];
      const items = cart.filter((item) => _ids.includes(item.product._id));
      const newData = {
         items: items.map((item) => ({
            product: item.product._id,
            price: item.product.price,
            quantity: item.quantity
         })),
         orderBy: user._id,
         totalPrice: totalPrice,
         ...data
      };
      mutation.mutate(newData);
   };

   return (
      <>
         <Breadcrumb data={['Giỏ hàng']} className='mb-4' />
         <section className='flex flex-col gap-4 md:flex-row'>
            <div className='basis-9/12'>
               <CartList selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} />
            </div>
            <div className='basis-3/12'>
               <div className='section-card'>
                  <h2 className='mb-4 font-bold'>Thanh toán</h2>
                  <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                     <h4 className='text-xl font-medium text-[--red-color]'>
                        Tổng tiền: {formatPrice(totalPrice)}
                     </h4>
                     <InputUI
                        label='Số điện thoại'
                        {...register('phone', {
                           required: 'Vui lòng không bỏ trống trường này'
                        })}
                        error={errors?.phone?.message}
                     />
                     <InputUI
                        label='Địa chỉ giao hàng'
                        {...register('address', {
                           required: 'Vui lòng không bỏ trống trường này'
                        })}
                        error={errors?.address?.message}
                     />
                     <InputUI label='Ghi chú đơn hàng' {...register('note')} />

                     <ButtonUI
                        type='submit'
                        color={
                           !user || Array.from(selectedKeys).length <= 0 ? 'default' : 'primary'
                        }
                        className='w-full'
                        disabled={!user || Array.from(selectedKeys).length <= 0}
                        isLoading={mutation.isPending}
                     >
                        Thanh toán
                     </ButtonUI>
                  </form>
               </div>
            </div>
         </section>
      </>
   );
};

export default CartPage;
