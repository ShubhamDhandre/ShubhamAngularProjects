import { Category } from "./categories";

export interface Product {
    _id: string;
    name: string;
    price: number;
    category: Category;
    productImage: string;
  }
  
  