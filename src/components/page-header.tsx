import BaseContainer from "@/components/base-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import { ChevronRightIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments
} from "next/navigation";

const PageHeader = () => {
  const segments = useSelectedLayoutSegments();
  const segment = useSelectedLayoutSegment();
  const pageTitle = segment || "Page title";
  const hasBackButton = segments.length > 1;
  const router = useRouter();

  return (
    <Stack spacing={3} py={5}>
      <Breadcrumb
        fontSize={12}
        color={"gray.500"}
        separator={<ChevronRightIcon fontSize={16} />}
        spacing={1}
      >
        <BreadcrumbItem>
          <Text>Admin</Text>
        </BreadcrumbItem>
        {segments.map((segment, i) => (
          <BreadcrumbItem key={i}>
            {i < 1 ? (
              <Text>{segment[0].toUpperCase() + segment.slice(1)}</Text>
            ) : (
              <Text>Detail</Text>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Heading size={"md"} fontWeight={600}>
        {hasBackButton && (
          <IconButton
            aria-label="back"
            icon={<ArrowBackIcon />}
            variant={"ghost"}
            fontSize={24}
            size={"sm"}
            mr={2}
            onClick={() => router.back()}
          />
        )}
        {pageTitle[0].toUpperCase() + pageTitle.slice(1)}
      </Heading>
    </Stack>
  );
};

export default PageHeader;
