"use client";

import { Stack } from "@chakra-ui/react";
import { useProductsContext } from "./provider";
import PageCard from "@/components/page-card";
import BaseContainer from "@/components/base-container";
import { createColumnHelper } from "@tanstack/react-table";
import { Product } from "@/app/api/type";
import useGetColumns from "@/hooks/useGetColumns";
import { BaseTable } from "@/components/base-table";
import TableWrapper from "@/components/table-wrapper";

const initialColumnList = [
  { id: "title", label: "Product Name" },
  { id: "brand", label: "Brand" },
  { id: "price", label: "Price" },
  { id: "stock", label: "Stock" },
  { id: "category", label: "Category" }
];

const ProductPage = () => {
  const { data, state, status, setState } = useProductsContext();
  const columns = useGetColumns(initialColumnList);
  const { limit, skip } = state.query;
  const { products, total } = data;

  const handlePaginate = ({
    pageSize,
    pageIndex
  }: {
    pageSize: number;
    pageIndex: number;
  }) => {
    setState(prev => ({
      query: {
        ...prev.query,
        skip: pageIndex * pageSize,
        limit: pageSize
      }
    }));
  };

  console.log(state);

  return (
    <PageCard title="All Product" subtitle="Show all list of products">
      <TableWrapper
        isEmpty={false}
        isLoading={status.loading}
      >
        <BaseTable
          handlePageChanged={handlePaginate}
          initialState={{
            pagination: { pageIndex: skip / limit, pageSize: limit }
          }}
          columns={columns}
          data={products || []}
          manualPagination={true}
          pageCount={Math.ceil(total / limit)}
          totalItems={total}
          // onRowClick={e => router.push(pathname + `/chats/${e.customer_id}`)}
        />
      </TableWrapper>
    </PageCard>
  );
};

export default ProductPage;
