export type PAGE_LIST_PROPS = {
  title: string;
  key: string;
};

export const PAGE_LIST: PAGE_LIST_PROPS[] = [
  {
    title: "Product",
    key: "product"
  },
  {
    title: "Cart",
    key: "cart"
  }
];

export const SELECTED_COLUMN_PRODUCTS = "title,price,stock,brand,category";
