"use client";

import useMovePage from "@/hooks/useMovePage";
import { PAGE_LIST_PROPS } from "@/lib/variables";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { SidebarContainer, SidebarList, SidebarListItem } from "./sidebar";

type WrapperProps = {
  menu: PAGE_LIST_PROPS[];
  children: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  const { segment, handleMove } = useMovePage();

  return (
    <Flex direction={"row"} h="full">
      <SidebarContainer display={{ base: "none", md: "flex" }}>
        <Flex px={4}>
          <SidebarList>
            {props.menu.map(item => (
              <SidebarListItem
                key={item.key}
                onClick={() => {
                  handleMove(item.key);
                }}
                text={item.title}
                active={segment === item.key}
              />
            ))}
          </SidebarList>
        </Flex>
      </SidebarContainer>
      <Flex flex="auto" h={"100%"} direction={"column"}>
        {props.children}
      </Flex>
    </Flex>
  );
};

export default Wrapper;
