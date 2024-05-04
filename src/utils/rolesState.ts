import { ROLES } from '~/constants';

export const getRoleText = (status: string): string => {
   const roleText = ROLES[status as keyof typeof ROLES];
   return roleText;
};
