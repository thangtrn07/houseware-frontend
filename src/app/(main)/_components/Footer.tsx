import React from 'react';
import BrandLogo from '~/components/BrandLogo';

const introduce =
   'Đức Mạnh gia dụng Store - Kênh phân phối các sản phẩm gia dụng trong và ngoài nước.';

const footerInformations = [
   {
      title: 'Người dùng',
      informations: ['Đăng nhập', 'Đăng ký']
   },
   {
      title: 'Liên hệ',
      informations: [
         'Mua hàng: <a href="tel:0123456789" class="hover:text-[--red-color]"><b>0123456789</b></a> (7h-18h)',
         'Mua hàng: <a href="tel:0123456789" class="hover:text-[--red-color]"><b>0123456789</b></a> (7h-18h)',
         'Mua hàng: <a href="tel:0123456789" class="hover:text-[--red-color]"><b>0123456789</b></a> (7h-18h)'
      ]
   }
];

interface InfoBlockProps {
   title: string;
   informations: string[];
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, informations }) => {
   return (
      <div className='basis-6/12 lg:basis-4/12'>
         <h4 className='mb-3 font-medium'>{title}</h4>
         <ul className='space-y-2 text-sm text-[--gray-500-color]'>
            {informations?.map((infor, index) => (
               <li key={index} dangerouslySetInnerHTML={{ __html: infor }} />
            ))}
         </ul>
      </div>
   );
};

const Footer = () => {
   return (
      <footer className='border-t border-b-[--gray-300-color] bg-white'>
         <div className='container py-8'>
            <div className='flex flex-col gap-4 md:flex-row'>
               <div className='basis-full md:basis-6/12 lg:basis-4/12'>
                  {/* LOGO */}
                  <BrandLogo className='mb-2' />
                  {/* INTRODUCE */}
                  <p className='line-clamp-2 text-sm' title={introduce}>
                     {introduce}
                  </p>
               </div>
               <div className='flex basis-8/12 justify-end gap-4 text-base'>
                  {footerInformations?.map((item, index) => <InfoBlock key={index} {...item} />)}
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
