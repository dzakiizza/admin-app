import { Container, ContainerProps } from "@chakra-ui/react";
import React from "react";

const BaseContainer: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  children,
  ...props
}) => {
  return (
    <Container
      maxW={{
        base: "container.sm",
        md: "container.md",
        lg: "container.lg",
        xl: "container.xl",
      }}
      {...props}
    >
      {children}
    </Container>
  );
};

export default BaseContainer;
