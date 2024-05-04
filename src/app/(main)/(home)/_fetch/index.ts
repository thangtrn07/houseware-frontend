import axiosInstance from '~/axios/axiosInstance';

export const fetchHome = async () => {
   const response = await axiosInstance.get('/home');
   return response?.data?.metadata;
};
