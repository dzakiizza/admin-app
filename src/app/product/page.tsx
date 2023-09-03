"use client";

import { BaseTable } from "@/components/base-table";
import PageCard from "@/components/page-card";
import TableWrapper from "@/components/table-wrapper";
import useGetColumns from "@/hooks/useGetColumns";
import { useProductsContext } from "./provider";

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

  return (
    <PageCard title="All Products" subtitle="Show all list of products">
      <TableWrapper isEmpty={false} isLoading={status.loading}>
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
        />
      </TableWrapper>
    </PageCard>
  );
};

export default ProductPage;
