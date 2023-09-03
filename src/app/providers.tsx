// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import theme from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000
      }
    }
  });
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []); // avoid hydration
  if (!mounted) return null;
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <NextTopLoader showSpinner={true} color={theme.colors.blue?.["400"]} />
        <QueryClientProvider client={queryClient}>
          <Flex h="100vh" w="100vw" flexDir="column">
            {children}
          </Flex>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
