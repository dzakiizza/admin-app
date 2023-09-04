"use client";

import { BaseTable } from "@/components/base-table";
import PageCard from "@/components/page-card";
import TableWrapper from "@/components/table-wrapper";
import useGetColumns from "@/hooks/useGetColumns";
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/react";
import { useCartsContext } from "../provider";

const initialColumnList = [
  { id: "title", label: "Product Name" },
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "discountPercentage", label: "Discount Percentage" },
  { id: "discountedPrice", label: "Price Discoundt" },
  { id: "total", label: "Total Price" }
];

const CartDetailPage = () => {
  const { data, state, status, handler } = useCartsContext();
  const columns = useGetColumns(initialColumnList);
  const {
    products,
    discountedTotal,
    total,
    totalProducts,
    totalQuantity,
  } = data.item;

  return (
    <PageCard
      title="Cart Detail"
      subtitle="Show all list of products from cart detail"
    >
      <TableWrapper isEmpty={!products.length} isLoading={status.item.loading}>
        <SimpleGrid columns={{base: 2, md: 4}} mb="5" spacing={2}>
          <Stat>
            <StatLabel>Total Quantity</StatLabel>
            <StatNumber>{totalQuantity}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Products</StatLabel>
            <StatNumber>{totalProducts}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Discount</StatLabel>
            <StatNumber>{discountedTotal}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Price</StatLabel>
            <StatNumber>{total}</StatNumber>
          </Stat>
        </SimpleGrid>

        <BaseTable
          handlePageChanged={handler.handlePaginate}
          columns={columns}
          data={products || []}
        />
      </TableWrapper>
    </PageCard>
  );
};

export default CartDetailPage;
