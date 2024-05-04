import { ORDER_STATUS, ORDER_STATUS_COLOR } from '~/constants';

export const getStatusText = (status: string): string => {
   const statusText = ORDER_STATUS[status as keyof typeof ORDER_STATUS];
   return statusText;
};

export const getStatusColor = (status: string): string => {
   const statusText = ORDER_STATUS_COLOR[status as keyof typeof ORDER_STATUS];
   return statusText;
};
