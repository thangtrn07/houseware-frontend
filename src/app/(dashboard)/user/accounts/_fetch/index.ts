import axiosInstance from '~/axios/axiosInstance';

export const fetchAccount = async ({
   page,
   limit,
   filter
}: {
   page?: number;
   limit?: number;
   filter?: string;
}) => {
   const response = await axiosInstance.get('/users', {
      params: {
         page,
         limit,
         filter
      }
   });
   return { result: response?.data?.metadata, pagination: response?.data?.pagination };
};

export const register = ({ username, password, fullname, phone, address }: any) => {
   return axiosInstance.post('/auth/register', {
      username,
      password,
      fullname,
      phone,
      address
   });
};

export const changePassword = ({ username, password }: any) => {
   return axiosInstance.post('/auth/change-password', {
      username,
      password
   });
};
export const updateAccount = ({ _id, fullname, phone, address, image, role }: any) => {
   return axiosInstance.put('/users', {
      _id,
      fullname,
      phone,
      address,
      image,
      role
   });
};
