import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Stack,
  CardProps
} from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  direction?: "vertical" | "horizontal";
};

const PageCard = ({
  children,
  title = "",
  subtitle = "",
  ...cardProps
}: Props & CardProps) => {
  return (
    <Card
      w={"100%"}
      {...cardProps}
    >
      <>
        {title && subtitle && (
          <CardHeader flex={1}>
            <Stack>
              <Heading size={"sm"} fontWeight={600}>
                {title}
              </Heading>
              <Text fontSize={12}>{subtitle}</Text>
            </Stack>
          </CardHeader>
        )}
        <CardBody flex={2}>{children}</CardBody>
      </>
    </Card>
  );
};

export default PageCard;
