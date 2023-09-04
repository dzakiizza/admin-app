"use client";

import { BaseTable } from "@/components/base-table";
import PageCard from "@/components/page-card";
import TableWrapper from "@/components/table-wrapper";
import useGetColumns from "@/hooks/useGetColumns";
import { useProductsContext } from "./provider";
import SearchInput from "@/components/search-input";
import { Flex } from "@chakra-ui/react";

const initialColumnList = [
  { id: "title", label: "Product Name" },
  { id: "brand", label: "Brand" },
  { id: "price", label: "Price" },
  { id: "stock", label: "Stock" },
  { id: "category", label: "Category" }
];

const ProductPage = () => {
  const { data, state, status, handler } = useProductsContext();
  const columns = useGetColumns(initialColumnList);
  const { limit, skip } = state.query;
  const { products, total } = data;

  return (
    <PageCard title="All Products" subtitle="Show all list of products">
      <Flex w={{base: "full", md: "xs", lg: "xs"}} mb="5">
        <SearchInput
          handleSearch={handler.handleSearch}
          handleClearSearch={handler.handleClearSearch}
        />
      </Flex>
      <TableWrapper isEmpty={!products.length} isLoading={status.loading}>
        <BaseTable
          handlePageChanged={handler.handlePaginate}
          initialState={{
            pagination: { pageIndex: skip / limit, pageSize: limit }
          }}
          columns={columns}
          data={products || []}
          manualPagination={true}
          pageCount={Math.ceil(total / limit)}
          totalItems={total}
        />
      </TableWrapper>
    </PageCard>
  );
};

export default ProductPage;
