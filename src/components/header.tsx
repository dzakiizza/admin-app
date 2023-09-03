"use client";

import useMovePage from "@/hooks/useMovePage";
import { PAGE_LIST } from "@/lib/variables";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import Link from "next/link";
import { SidebarContainer, SidebarList, SidebarListItem } from "./sidebar";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { segment, handleMove } = useMovePage();
  return (
    <HStack
      h="20"
      position="sticky"
      backdropFilter="auto"
      backdropBlur="8px"
      top="0"
      bg="black"
      p="4"
    >
      <HStack alignItems="center" gap="4">
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="menu-button"
          borderColor="blue.300"
          icon={<HamburgerIcon color="blue.300" />}
          variant="outline"
          onClick={onOpen}
        />
        <Link href={"/"}>
          <Heading
            bgGradient="linear(to-r, blue.400, teal.400)"
            bgClip="text"
            size="lg"
          >
            Admin App
          </Heading>
        </Link>
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgGradient="linear(to-b, black,  blue.900)">
          <DrawerCloseButton />
          <DrawerBody mt="14" p="0">
            <SidebarContainer bg="transparent" w="full">
              <Flex px={4}>
                <SidebarList>
                  {PAGE_LIST.map(item => (
                    <SidebarListItem
                      key={item.key}
                      onClick={() => {
                        handleMove(item.key);
                        onClose();
                      }}
                      text={item.title}
                      active={segment === item.key}
                    />
                  ))}
                </SidebarList>
              </Flex>
            </SidebarContainer>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
