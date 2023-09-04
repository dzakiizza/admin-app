import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from "@chakra-ui/react";
import { SmallCloseIcon, SearchIcon } from "@chakra-ui/icons";
import React from "react";

const SearchInput: React.FC<
  InputProps & {
    handleSearch: (value: string) => void;
    handleClearSearch: () => void;
  }
> = ({ handleClearSearch, handleSearch, ...props }) => {
  const [state, setState] = React.useState("");
  return (
    <Flex alignItems="center" gap="3" flex="auto">
      <InputGroup size="sm" alignItems="center" gap="2">
        <Input
          _focusVisible={{ outline: "none", borderColor: "blue.400" }}
          borderRadius="md"
          size="sm"
          value={state}
          onChange={e => {
            setState(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(state);
            }
          }}
          borderColor={"gray.500"}
          _placeholder={{
            color: "gray.500"
          }}
          {...props}
        />
        <InputRightElement
          display={state ? "flex" : "none"}
          cursor="pointer"
          onClick={() => {
            handleClearSearch();
            setState("");
          }}
        >
          <Icon as={SmallCloseIcon} />
        </InputRightElement>
      </InputGroup>
      <Icon
        as={SearchIcon}
        boxSize={5}
        cursor="pointer"
        onClick={() => {
          handleSearch(state);
        }}
      />
    </Flex>
  );
};

export default SearchInput;
