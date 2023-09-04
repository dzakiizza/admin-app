import { Input, InputProps } from "@chakra-ui/react";
import React from "react";

const DebounceInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputProps, "onChange">) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      size="sm"
      borderColor={"gray.500"}
      borderRadius={"md"}
      _placeholder={{
        color: "gray.500"
      }}
    />
  );
};

export default DebounceInput;
