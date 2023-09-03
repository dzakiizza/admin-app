"use server";

import QueryString from "qs";
import { ProductsQueryResponse, QueryParams } from "./type";
import { getApiUrl } from "@/lib/getApiUrl";
import { SELECTED_COLUMN_PRODUCTS } from "@/lib/variables";

export const getProducts = async (props: { query?: QueryParams }) => {
  const queryParams = QueryString.stringify(props.query);
  const url = `${getApiUrl()}/products/search?${queryParams}&select=${SELECTED_COLUMN_PRODUCTS}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    cache: "no-store"
  });
  const json = (await res.json()) as ProductsQueryResponse;
  if (res.status !== 200) {
    throw new Error("Something went wrong!");
  }
  return json;
};
