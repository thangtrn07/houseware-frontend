import React from 'react';
import NotFoundTemplate from '~/components/NotFoundTemplate';

const NotFoundPage = () => {
   return (
      <NotFoundTemplate
         title='Không tìm thấy sản phẩm'
         subtitle='Xin lỗi, sản phẩm mà bạn tìm không tồn tại'
      />
   );
};

export default NotFoundPage;
