import React from 'react';
import tw from '~/lib/tw';

interface RowProps {
   className?: string;
   title: string;
   content: string;
}

const Row: React.FC<RowProps> = ({ title, content }) => {
   return (
      <tr className='border-b odd:bg-[--gray-200-color] even:bg-white'>
         <td className='w-1/3 px-4 py-3 font-medium text-gray-900'>{title}</td>
         <td className='w-2/3 px-4 py-3'>
            <div>{content}</div>
         </td>
      </tr>
   );
};

interface TableProps {
   className?: string;
   data: any;
   children?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ className, data, children }) => {
   return (
      <table className={tw('w-full rounded-md text-left text-sm text-gray-500', className)}>
         <tbody>
            <Row title='Thương hiệu' content={data?.brand} />
            <Row title='Kích thước' content={data?.size} />
            <Row title='Màu sắc' content={data?.color} />
            <Row title='Xuất xứ' content={data?.origin} />
         </tbody>
      </table>
   );
};

export default Table;
