import React from 'react';
import {
   ModalProps,
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter
} from '@nextui-org/react';
import ButtonUI from './ButtonUI';

export type ModalType = 'view' | 'create' | 'edit' | 'delete' | undefined | null;

interface ModalUIProps {
   headerTitle?: {
      view?: string;
      edit?: String;
      create?: String;
      delete?: String;
   };
   isLoading: boolean;
   modalType: ModalType;
   isOpen: boolean;
   onOpenChange: (isOpen: boolean) => void;
   onSave?: () => void;
   children: React.ReactNode | ((modalType: ModalType) => React.ReactNode);
   formId?: string;
}

const header = { view: 'Xem chi tiết', create: 'Tạo mới', edit: 'Chỉnh sửa', delete: 'Xoá' };

const ModalUI: React.FC<Omit<ModalProps, 'children'> & ModalUIProps> = ({
   headerTitle = header,
   children,
   modalType,
   isLoading,
   isOpen,
   onOpenChange,
   onSave,
   formId,
   size,
   ...rest
}) => {
   console.log();
   return (
      <Modal
         placement='center'
         isOpen={isOpen}
         onOpenChange={(isOpen) => {
            onOpenChange?.(isOpen);
         }}
         isDismissable={!isLoading}
         hideCloseButton={isLoading}
         scrollBehavior='inside'
         size={modalType === 'delete' ? 'sm' : size}
         {...rest}
      >
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className='flex flex-col gap-1'>
                     {headerTitle?.[modalType!]}
                  </ModalHeader>
                  <ModalBody>
                     {typeof children === 'function' ? children?.(modalType) : children}
                  </ModalBody>
                  <ModalFooter>
                     <ButtonUI
                        disabled={isLoading}
                        color='danger'
                        variant='light'
                        onClick={onClose}
                     >
                        Đóng
                     </ButtonUI>
                     {modalType !== 'view' && (
                        <ButtonUI
                           color='primary'
                           onClick={onSave}
                           isLoading={isLoading}
                           form={formId}
                           type={!!formId ? 'submit' : 'button'}
                        >
                           {modalType === 'delete' ? 'Xoá' : 'Lưu'}
                        </ButtonUI>
                     )}
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   );
};

export default ModalUI;
