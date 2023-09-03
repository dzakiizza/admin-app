"use client";

import useMovePage from "@/hooks/useMovePage";
import { PAGE_LIST_PROPS } from "@/lib/variables";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { SidebarContainer, SidebarList, SidebarListItem } from "./sidebar";
import PageHeader from "./page-header";
import BaseContainer from "./base-container";
import Scrollbars from "rc-scrollbars";

type WrapperProps = {
  menu: PAGE_LIST_PROPS[];
  children: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  const { segment, handleMove } = useMovePage();

  return (
    <Flex direction={"row"} h="full" overflow={"hidden"}>
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
      <Flex flex="auto" direction={"column"}>
        <Scrollbars
          autoHide
          style={{
            width: "100%",
            height: "100%",
            overflowX: "hidden"
          }}
          universal={true}
        >
          <BaseContainer h="fit-content" mb="20">
            <PageHeader />
            <Flex flex="auto">{props.children}</Flex>
          </BaseContainer>
        </Scrollbars>
      </Flex>
    </Flex>
  );
};

export default Wrapper;
