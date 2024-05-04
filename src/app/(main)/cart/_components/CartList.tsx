import React from 'react';
import {
   Avatar,
   AvatarGroup,
   Button,
   Chip,
   Link,
   Pagination,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow
} from '@nextui-org/react';
import formatPrice from '~/utils/formatPrice';
import EmptyStates from '~/components/EmptyStates';
import useStores from '~/stores/stores';
import QuantityButton from './QuantityButton';

interface CartListProps {
   selectedKeys: any;
   onSelectionChange?: (keys: any) => any;
}

const CartList: React.FC<CartListProps> = ({ selectedKeys, onSelectionChange }) => {
   const { cart, increaseQuantity, decreaseQuantity } = useStores();

   return (
      <Table
         aria-label='Category table'
         isHeaderSticky
         selectionMode='multiple'
         classNames={{
            wrapper: 'rounded-md',
            table: 'min-w-[600px]'
         }}
         selectedKeys={selectedKeys}
         onSelectionChange={onSelectionChange as any}
      >
         <TableHeader>
            <TableColumn width='20%'>Hình ảnh</TableColumn>
            <TableColumn>Tên sản phẩm</TableColumn>
            <TableColumn>Số lượng</TableColumn>
            <TableColumn>Giá</TableColumn>
            <TableColumn>Tổng tiền</TableColumn>
         </TableHeader>
         <TableBody items={cart || []} emptyContent={<EmptyStates />}>
            {(item) => (
               <TableRow key={item?.product?._id}>
                  <TableCell>
                     <AvatarGroup isBordered className='!justify-start'>
                        {item?.product.images?.map((image) => (
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
                     <Link
                        href={`/product/${item.product._id}`}
                        target='_blank'
                        className='line-clamp-2 max-w-64'
                        title={item?.product.name}
                     >
                        {item?.product.name}
                     </Link>
                  </TableCell>
                  <TableCell>
                     <QuantityButton
                        quantity={item.quantity}
                        increase={() => increaseQuantity(item.product._id)}
                        decrease={() => decreaseQuantity(item.product._id)}
                     />
                  </TableCell>
                  <TableCell>{formatPrice(item?.product.price)}</TableCell>
                  <TableCell>{formatPrice(item?.quantity * item?.product?.price)}</TableCell>
               </TableRow>
            )}
         </TableBody>
      </Table>
   );
};

export default CartList;
