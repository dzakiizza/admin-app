"use client";

import React from "react";
import {
  ButtonGroup,
  Button,
  Text,
  Stack,
  Skeleton,
  Flex,
  FlexProps
} from "@chakra-ui/react";

type SidebarContainerProps = {
  children: React.ReactNode;
};

type SidebarListProps = {
  loading?: boolean;
  children: React.ReactNode;
};

type SidebarListItemProps = {
  text: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  disabled?: boolean;
};

export const SidebarContainer = (props: SidebarContainerProps & FlexProps) => {
  const { children, ...flexProps } = props;
  return (
    <Flex
      w={"240px"}
      direction={"column"}
      h="full"
      bgGradient="linear(to-b, black,  blue.900)"
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export const SidebarList = (props: SidebarListProps) => {
  return (
    <Stack spacing={2} w="full">
      {props.loading
        ? Array.from({
            length: 5
          }).map((_, i) => (
            <Flex key={i} h={10} alignItems={"center"}>
              <Skeleton h={4} w={"100%"} borderRadius={8} />
            </Flex>
          ))
        : props.children}
    </Stack>
  );
};

export const SidebarListItem = (props: SidebarListItemProps) => {
  return (
    <ButtonGroup
      w={"100%"}
      color="white"
      display={"flex"}
      isAttached
      variant="outline"
      opacity={props.disabled ? "0.6" : undefined}
      _hover={{
        cursor: props.disabled ? "not-allowed" : undefined,
        ...(props.active
          ? {
              opacity: "0.9"
            }
          : {
              outline: "1px solid"
            }),
        outlineColor: "gray.600",
        outlineOffset: "-1px"
      }}
      borderRadius={4}
      {...(props.active
        ? {
            borderLeftRadius: 0,
            bg: "gray.700",
            boxShadow: "inset 5px 0px 0px 0px #4299E1"
          }
        : {})}
    >
      <Button
        leftIcon={props.icon}
        w={"100%"}
        flex={"auto"}
        textAlign={"left"}
        justifyContent={"start"}
        border="none"
        _hover={{
          background: "none",
          cursor: props.disabled ? "not-allowed" : undefined
        }}
        pr={2}
        onClick={props.onClick}
      >
        <Text isTruncated color="white" fontWeight={400}>
          {props.text}
        </Text>
      </Button>
    </ButtonGroup>
  );
};
