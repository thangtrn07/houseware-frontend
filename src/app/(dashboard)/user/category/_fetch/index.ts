import axiosInstance from '~/axios/axiosInstance';

export const fetchCategory = async ({
   page,
   limit,
   filter
}: {
   page?: number;
   limit?: number;
   filter?: string;
}) => {
   const response = await axiosInstance.get('/category', {
      params: {
         page,
         limit,
         filter
      }
   });
   return { result: response?.data?.metadata, pagination: response?.data?.pagination };
};

export const createCategory = ({ name, image }: any) => {
   const formData = new FormData();
   formData.append('name', name);
   formData.append('image', image?.[0]);
   return axiosInstance.post('/category', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
};

export const updateCategory = ({ _id, name, image }: any) => {
   const formData = new FormData();
   formData.append('_id', _id);
   formData.append('name', name);
   formData.append('image', image?.[0]);
   return axiosInstance.put('/category', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
};

export const deleteCategory = (_id: any) => {
   return axiosInstance.delete(`/category/${_id}`);
};
