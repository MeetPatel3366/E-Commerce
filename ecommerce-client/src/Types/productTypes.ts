export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions{
  width:number
  height:number 
  depth:number
}

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  description: string;
  reviews: Review[];
  stock: number;
  tags: string[];
  brand: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  sku:string
  weight:number
  dimensions:Dimensions
  shippingInformation:string
  warrantyInformation:string
  returnPolicy:string
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
