import axiosInstance from '~/axios/axiosInstance';

export const fetchOrder = async ({
   page,
   limit,
   orderBy
}: {
   page?: number;
   limit?: number;
   orderBy?: string;
}) => {
   const response = await axiosInstance.get('/order', {
      params: {
         page,
         limit,
         orderBy
      }
   });
   return { result: response?.data?.metadata, pagination: response?.data?.pagination };
};

export const createOrder = ({ items, orderBy, totalPrice, note, address, phone }: any) => {
   return axiosInstance.post('/order', { items, orderBy, totalPrice, note, address, phone });
};

export const updateOrder = ({ _id, status }: any) => {
   return axiosInstance.put('/order', { _id, status });
};

export const deleteOrder = (_id: any) => {
   return axiosInstance.delete(`/order/${_id}`);
};
