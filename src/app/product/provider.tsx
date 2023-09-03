"use client";

import * as React from "react";
import { ProductsQueryResponse, QueryParams } from "../api/type";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product";

interface StoreProps {}

interface ProviderProps extends StoreProps {
  children?: React.ReactNode;
}

type ContextType = {
  setState: React.Dispatch<React.SetStateAction<ContextType["state"]>>;
  state: {
    query: QueryParams;
  };
  data: ProductsQueryResponse | any;
  status: {
    loading: boolean;
    fetching: boolean;
  };
};

const initialValues: ContextType = {
  setState: () => {},
  state: {
    query: { q: "", skip: 0, limit: 10 }
  },
  data: {
    products: [],
    total: 0,
    skip: 0,
    limit: 0
  },
  status: {
    loading: false,
    fetching: false
  }
};

const context = React.createContext<ContextType>(initialValues);

export const useProductsContext = () => {
  const store = React.useContext(context);
  if (!store) {
    throw new Error(
      "Cannot use `useProductsContext` outside of a SubscriptionProvider"
    );
  }
  return store;
};

const Store = (props: StoreProps) => {
  const [state, setState] = React.useState<ContextType["state"]>(
    initialValues.state
  );

  const itemsQuery = useQuery({
    queryKey: ["products", { ...state.query }],
    queryFn: () => getProducts({ query: state.query }),
    keepPreviousData: true
  });

  const products = itemsQuery.data || [];
  return {
    state,
    setState,
    data: products,
    status: {
      loading: itemsQuery.isLoading,
      fetching: itemsQuery.isFetching
    }
  };
};

export const ProductsProvider = (props: ProviderProps) => {
  const { children, ...storeData } = props;
  return (
    <context.Provider value={Store(storeData)}>{children}</context.Provider>
  );
};
