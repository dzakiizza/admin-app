import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const PageLoadingComponent = () => {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner color="blue.400" />
    </Box>
  );
};

export default PageLoadingComponent;
