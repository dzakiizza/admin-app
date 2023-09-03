export type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
};

export type QueryParams = {
  q: string;
  skip: number;
  limit: number;
};

export type ProductsQueryResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
