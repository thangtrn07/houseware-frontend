import { format } from 'date-fns';

export const formatBaseDate = (date: string | Date) => {
   return format(new Date(date), 'dd/MM/yyyy');
};

export const formatFullDate = (date: string | Date) => {
   return format(new Date(date), "HH'h'mm'p' dd/MM/yyyy");
};
