import axiosInstance from '~/axios/axiosInstance';
import { IProduct } from '~/interfaces/schema.interfaces';

export const fetchProducts = async ({ page, limit, filter }: any) => {
   const response = await axiosInstance.get('/products', {
      params: {
         page,
         limit,
         filter
      }
   });
   return { result: response?.data?.metadata, pagination: response?.data?.pagination };
};

export const createProduct = (data: any = {}) => {
   const formData = new FormData();
   Object.entries(data).forEach(([key, value]) => {
      if (key === 'image') {
         (value as any[]).forEach((item) => {
            formData.append(key, item);
         });
      } else if (key === 'detail') {
         formData.append(key, JSON.stringify(value));
      } else {
         formData.append(key, value as any);
      }
   });
   return axiosInstance.post('/products', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
};

export const updateProduct = (data: Omit<IProduct, 'images'>) => {
   return axiosInstance.put('/products', data);
};

export const uploadImage = async (image: any) => {
   const formData = new FormData();
   formData.append('image', image);
   const res = await axiosInstance.post('/upload', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
   return res?.data?.metadata;
};

export const deleteProduct = (_id: any) => {
   return axiosInstance.delete(`/products/${_id}`);
};
