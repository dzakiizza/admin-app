export type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
};

export type ProductCart = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

export type Cart = {
  id: number;
  products: ProductCart[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export type QueryParams = {
  q?: string;
  skip: number;
  limit: number;
};

export type ProductsQueryResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type CartsQueryResponse = {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
};
