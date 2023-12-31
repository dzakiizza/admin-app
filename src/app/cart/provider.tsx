"use client";

import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { getCart, getCarts } from "../api/cart";
import { Cart, CartsQueryResponse, QueryParams } from "../api/type";

interface StoreProps {
  id?: string;
}

interface ProviderProps extends StoreProps {
  children?: React.ReactNode;
}

type ContextType = {
  setState: React.Dispatch<React.SetStateAction<ContextType["state"]>>;
  state: {
    query: QueryParams;
  };
  data: {
    items: CartsQueryResponse;
    item: Cart;
  };
  status: {
    items: {
      loading: boolean;
      fetching: boolean;
    };
    item: {
      loading: boolean;
      fetching: boolean;
    };
  };
  handler: {
    handlePaginate: ({
      pageSize,
      pageIndex
    }: {
      pageSize: number;
      pageIndex: number;
    }) => void;
  };
};

const initialValues: ContextType = {
  setState: () => {},
  state: {
    query: { skip: 0, limit: 10 }
  },
  data: {
    items: {
      carts: [],
      total: 0,
      skip: 0,
      limit: 0
    },
    item: {
      id: 0,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: 0,
      totalProducts: 0,
      totalQuantity: 0
    }
  },
  status: {
    items: {
      loading: false,
      fetching: false
    },
    item: {
      loading: false,
      fetching: false
    }
  },
  handler: {
    handlePaginate: () => {}
  }
};

const context = React.createContext<ContextType>(initialValues);

export const useCartsContext = () => {
  const store = React.useContext(context);
  if (!store) {
    throw new Error(
      "Cannot use `useCartsContext` outside of a SubscriptionProvider"
    );
  }
  return store;
};

const Store = (props: StoreProps) => {
  const [state, setState] = React.useState<ContextType["state"]>(
    initialValues.state
  );

  const itemsQuery = useQuery({
    queryKey: ["carts", { ...state.query }],
    queryFn: () => getCarts({ query: state.query }),
    keepPreviousData: true
  });

  const itemQuery = useQuery({
    queryKey: ["cart", { ...state.query }],
    queryFn: () => getCart({ id: props.id || "1" }),
    enabled: !!props.id,
    keepPreviousData: true
  });

  const items = itemsQuery.data || initialValues.data.items;
  const item = itemQuery.data || initialValues.data.item;

  const handlePaginate = ({
    pageSize,
    pageIndex
  }: {
    pageSize: number;
    pageIndex: number;
  }) => {
    setState({
      query: {
        skip: pageIndex * pageSize,
        limit: pageSize
      }
    });
  };

  return {
    state,
    setState,
    data: {
      items,
      item
    },
    status: {
      items: {
        loading: itemsQuery.isLoading,
        fetching: itemsQuery.isFetching
      },
      item: {
        loading: itemQuery.isLoading,
        fetching: itemQuery.isFetching
      }
    },
    handler: {
      handlePaginate
    }
  };
};

export const CartsProvider = (props: ProviderProps) => {
  const { children, ...storeData } = props;
  return (
    <context.Provider value={Store(storeData)}>{children}</context.Provider>
  );
};
