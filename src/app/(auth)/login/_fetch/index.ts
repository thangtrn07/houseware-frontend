import axiosInstance from '~/axios/axiosInstance';

export const login = ({ username, password }: any) => {
   return axiosInstance.post('/auth/login', {
      username,
      password
   });
};
