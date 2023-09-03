import { createColumnHelper } from "@tanstack/react-table";
import { Text, Tooltip } from "@chakra-ui/react";
import React from "react";
type Props = {
  id: string;
  label?: string;
  size?: number;
};

function useGetColumns(value: Props[]) {
  const columnHelper = createColumnHelper<Record<string, any>>();
  const columns = value.map(item => {
    return columnHelper.accessor(item.id, {
      cell: info => (
        <Tooltip label={info.getValue()} placement="bottom-start">
          <Text isTruncated>
            {info.getValue()}
          </Text>
        </Tooltip>
      ),
      header: item.label,
      size: item.size
    });
  });

  return columns;
}

export default useGetColumns;
