"use server";

import QueryString from "qs";
import { Cart, CartsQueryResponse, QueryParams } from "./type";
import { getApiUrl } from "@/lib/getApiUrl";

export const getCarts = async (props: { query?: QueryParams }) => {
  const queryParams = QueryString.stringify(props.query);
  const url = `${getApiUrl()}/carts?${queryParams}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    cache: "no-store"
  });
  const json = (await res.json()) as CartsQueryResponse;
  if (res.status !== 200) {
    throw new Error("Something went wrong!");
  }
  return json;
};

export const getCart = async (props: { id: string }) => {
  const url = `${getApiUrl()}/carts/${props.id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    cache: "no-store"
  });
  const json = (await res.json()) as Cart;
  if (res.status !== 200) {
    throw new Error("Something went wrong!");
  }
  return json;
};
