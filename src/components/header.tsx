"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import Link from "next/link";

const HEADER_MENU = [
  { title: "Product", link: "/product" },
  { title: "Cart", link: "/cart" }
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      h="20"
      position="sticky"
      backdropFilter="auto"
      backdropBlur="8px"
      top="0"
      bg="blackAlpha.400"
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
          <Heading bgGradient="linear(to-r, blue.400, teal.400)" bgClip="text">
            Admin App
          </Heading>
        </Link>
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt="40px">
            <VStack gap="2" w="full">
              {HEADER_MENU.map((item, idx) => (
                <Box
                  key={idx}
                  w="full"
                  borderRadius="8px"
                  _hover={{ bg: "gray.500" }}
                  border="1px solid"
                >
                  <Link href={item.link} onClick={onClose}>
                    <Text
                      p="8px"
                      _hover={{ cursor: "pointer" }}
                      fontWeight="semibold"
                    >
                      {item.title}
                    </Text>
                  </Link>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
