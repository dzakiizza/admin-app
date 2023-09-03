"use client";

import { BaseTable } from "@/components/base-table";
import PageCard from "@/components/page-card";
import TableWrapper from "@/components/table-wrapper";
import useGetColumns from "@/hooks/useGetColumns";
import { useCartsContext } from "./provider";
import { usePathname, useRouter } from "next/navigation";

const initialColumnList = [
  { id: "userId", label: "User" },
  { id: "totalProducts", label: "Total Product" },
  { id: "totalQuantity", label: "Total Quantity" },
  { id: "discountedTotal", label: "Total Discount" },
  { id: "total", label: "Total Price" }
];

const CartPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, state, status, setState } = useCartsContext();
  const columns = useGetColumns(initialColumnList);
  const { limit, skip } = state.query;
  const { carts, total } = data.items;

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

  return (
    <PageCard title="All Carts" subtitle="Show all list of carts">
      <TableWrapper isEmpty={false} isLoading={status.items.loading}>
        <BaseTable
          handlePageChanged={handlePaginate}
          initialState={{
            pagination: { pageIndex: skip / limit, pageSize: limit }
          }}
          columns={columns}
          data={carts || []}
          manualPagination={true}
          pageCount={Math.ceil(total / limit)}
          totalItems={total}
          enableRowSelection
          onRowClick={e => router.push(pathname + `/${e.id}`)}
        />
      </TableWrapper>
    </PageCard>
  );
};

export default CartPage;
