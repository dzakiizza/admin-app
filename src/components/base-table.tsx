"use client";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Select,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  chakra,
  Tooltip
} from "@chakra-ui/react";
import {
  ColumnDef,
  SortingState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import React from "react";
import Pagination from "./pagination";

export type BaseTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function BaseTable<T extends object>({
  data,
  columns,
  enableRowSelection,
  onRowClick,
  selectedId,
  manualPagination,
  pageCount,
  initialState,
  totalItems,
  handlePageChanged
}: Partial<TableOptions<T>> & {
  totalItems?: number;
  handlePageChanged?: ({
    pageSize,
    pageIndex
  }: {
    pageSize: number;
    pageIndex: number;
  }) => void;
  onRowClick?: (data: T) => void;
  selectedId?: string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    columns: columns || [],
    data: data || [],
    enableRowSelection,
    manualPagination: manualPagination || false,
    pageCount: pageCount || undefined,
    initialState: initialState || undefined,
    onRowSelectionChange: val => {
      setRowSelection(val);
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      rowSelection
    }
  });
  React.useEffect(() => {
    if (!selectedId) table.toggleAllRowsSelected(false);
  }, [selectedId]);

  const { pageIndex, pageSize } = table.getState().pagination;
  const currentPage = initialState?.pagination?.pageIndex ?? pageIndex;

  React.useEffect(() => {
    if (handlePageChanged) {
      handlePageChanged({ pageSize, pageIndex });
    }
  }, [pageIndex, pageSize]);

  const handlePageIndex = React.useCallback(
    (page: number) => {
      table.setPageIndex(page);
    },
    [table.setPageIndex]
  );

  return (
    <VStack spacing="6">
      <TableContainer w="full">
        <Stack spacing={4} gap={"34px"}>
          <Table
            __css={{
              tableLayout: "auto",
              width: "full"
            }}
            variant={"striped"}
            colorScheme="blue"
          >
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    const meta: any = header.column.columnDef.meta;
                    return (
                      <Th
                        textTransform={"capitalize"}
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        isNumeric={meta?.isNumeric}
                        width={`${header.column.getSize()}px`}
                        p={"3"}
                        fontSize={"sm"}
                        bg="gray.800"
                        borderTopLeftRadius={
                          header.index === 0 ? "12px" : undefined
                        }
                        borderTopRightRadius={
                          header.index === headerGroup.headers.length - 1
                            ? "12px"
                            : undefined
                        }
                      >
                        <Flex>
                          <Tooltip
                            label={header.column.columnDef.header as string}
                            placement="bottom-start"
                          >
                            <Text isTruncated>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Text>
                          </Tooltip>
                          <chakra.span pl="4">
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <TriangleDownIcon aria-label="sorted descending" />
                              ) : (
                                <TriangleUpIcon aria-label="sorted ascending" />
                              )
                            ) : null}
                          </chakra.span>
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map(row => (
                <Tr
                  key={row.id}
                  onClick={() => {
                    if (row.getIsSelected() && selectedId) return;
                    onRowClick?.(row.original);
                    table.toggleAllRowsSelected(false);
                    row.toggleSelected(true);
                  }}
                  _hover={{
                    cursor: enableRowSelection ? "pointer" : undefined,
                    color:
                      enableRowSelection && !(selectedId && row.getIsSelected())
                        ? "teal.300"
                        : undefined
                  }}
                >
                  {row.getVisibleCells().map(cell => {
                    const meta: any = cell.column.columnDef.meta;
                    return (
                      <Td key={cell.id} isNumeric={meta?.isNumeric} isTruncated>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </TableContainer>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", lg: "row" }}
        gap="4"
      >
        <HStack gap={4}>
          <HStack gap={2}>
            <Text fontSize={"sm"} color={"gray.200"} whiteSpace="nowrap">
              Rows per page
            </Text>
            <Select
              focusBorderColor="blue.400"
              size={"sm"}
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
              borderRadius={"8px"}
            >
              {[5, 10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
          </HStack>
          <Text fontSize={"sm"} color={"gray.200"}>
            Total records: <strong>{totalItems || data?.length || 0}</strong>
          </Text>
        </HStack>
        <Flex>
          <Pagination
            totalItems={totalItems || data?.length || 1}
            onChange={handlePageIndex}
            perPage={pageSize}
            initialPage={currentPage + 1}
          />
        </Flex>
      </Flex>
    </VStack>
  );
}
