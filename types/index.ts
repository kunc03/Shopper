export interface Product {
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  price: number;
  brand: string;
  image: string;
  isNew: boolean;
  category: string;
}
[];

export interface ProductData {
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  price: number;
  brand: string;
  image: string;
  isNew: boolean;
  category: string;
}

export interface StoreProduct {
  email: string | number | null;
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  price: number;
  brand: string;
  image: string;
  quantity: number;
  category: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}
