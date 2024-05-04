export interface IImage {
   _id: string;
   imageUrl: string;
   publicId?: string;
   default?: boolean;
   createdAt: string;
   updatedAt: string;
}

export interface ICategory {
   _id: string;
   name: string;
   image?: IImage;
   createdAt: string;
   updatedAt: string;
}

export interface IProduct {
   _id: string;
   name: string;
   slug: string;
   category: ICategory;
   images: IImage[];
   price: number;
   detail?: {
      size: String;
      color: String;
      brand: String;
      origin: String;
   };
   description?: string;
   quantity: number;
   createdAt: string;
   updatedAt: string;
   sold?: number | string;
}

export interface IOrderItem {
   _id?: string;
   product: IProduct;
   price: number;
   quantity: number;
}

export interface IOrder {
   _id: string;
   items: IOrderItem[];
   address: string;
   phone: string;
   status: string;
   note: string;
   totalPrice: number;
   orderBy: IUser;
   createdAt: string;
   updatedAt: string;
}

export interface IUser {
   _id: string;
   fullname: string;
   image: string;
   address: string;
   phone: string;
   account: IAccount;
   role: string;
   createdAt: string;
   updatedAt: string;
}

export interface IAccount {
   _id: string;
   username: string;
   password?: string;
   provider: Provider;
   providerId?: string;
   createdAt: string;
   updatedAt: string;
}

export enum Provider {
   LOCAL = 'Local',
   GOOGLE = 'Google',
   FACEBOOK = 'Facebook'
}
