import React from "react";
import Image from "next/image";
import EmptyStateComponent from "@/components/empty-state";
import PageLoadingComponent from "@/components/page-loading";
import { Flex } from "@chakra-ui/react";

const TableWrapper: React.FC<
  React.PropsWithChildren<{
    isEmpty: boolean;
    isLoading: boolean;
    title?: string;
    message?: string;
  }>
> = ({
  children,
  isEmpty,
  isLoading,
  title = "There is no data",
  message = "Currently there is nothing to show here"
}) => {
  if (isLoading) {
    return (
      <Flex py={3}>
        <PageLoadingComponent />
      </Flex>
    );
  }
  if (isEmpty) {
    return <EmptyStateComponent title={title} message={message} />;
  }

  return <>{children}</>;
};

export default TableWrapper;
