import usePagination from "headless-pagination-react";
import { PaginatorOptions } from "headless-pagination";
import { useEffect } from "react";
import { Button, IconButton, Stack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type PaginationProps = {
  onChange: (page: number) => void;
} & PaginatorOptions;

const Pagination = (props: PaginationProps) => {
  const maxLinks = 6;
  const pagination = usePagination({
    ...props,
    maxLinks
  });
  const { page, links, hasNext, hasPrevious, setPage } = pagination;
  useEffect(() => {
    setPage(props.initialPage || 1);
  }, [props.initialPage]);

  return (
    <Stack direction="row" flexWrap="wrap">
      <IconButton
        aria-label="Pagination previous"
        icon={<ChevronLeftIcon />}
        onClick={() => props.onChange(page - 2)}
        isDisabled={!hasPrevious}
        rounded="md"
        variant="outline"
        bg="gray.900"
      />
      {links.map((link, index) => (
        <Button
          onClick={() => {
            typeof link.label !== "string"
              ? props.onChange(link.label - 1)
              : index === 1
              ? props.onChange(Number(links[2].label) - 2)
              : index === 4
              ? props.onChange(Number(links[3].label) + 2)
              : undefined;
          }}
          key={index}
          rounded="md"
          variant="outline"
          bg={link.active ? "gray.800" : "gray.900"}
          color={link.active ? "blue.400" : "white"}
          borderColor={link.active ? "blue.300" : "gray.500"}
          fontSize="sm"
          fontWeight="normal"
        >
          {link.label}
        </Button>
      ))}
      <IconButton
        aria-label="Pagination next"
        icon={<ChevronRightIcon />}
        onClick={() => props.onChange(page)}
        isDisabled={!hasNext}
        rounded="md"
        variant="outline"
        bg="gray.900"
      />
    </Stack>
  );
};

export default Pagination;
