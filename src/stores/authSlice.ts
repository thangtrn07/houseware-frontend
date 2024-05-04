import { StateCreator } from 'zustand';
import { IUser } from '~/interfaces/schema.interfaces';

export interface AuthSlice {
   user: IUser | null;
   setUser: (user: IUser) => void;
   removeUser: () => void;
}

export const authSlice: StateCreator<AuthSlice> = (set: any) => ({
   user: null,
   setUser: (user) => set(() => ({ user: user })),
   removeUser: () => set(() => ({ user: null }))
});
