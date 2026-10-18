"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useGenericDisclosure } from "@/hooks/ui/useGenericDisclosure";
import type { GenericDisclosureTextProps } from "@/props/custom/display/GenericDisclosureTextProps";

const GenericDisclosureText = ({ title, content, openLabel = "Read description", closeLabel = "Hide description" }: GenericDisclosureTextProps) => {
  const { open, contentId, toggle } = useGenericDisclosure();
  return <Box>
    <Flex align="center" justify="space-between" gap="3">
      <Text fontWeight="semibold" fontSize="sm">{title}</Text>
      <CustomButton appearance="ghost" size="sm" onClick={toggle} aria-expanded={open} aria-controls={contentId}>
        {open ? closeLabel : openLabel}
      </CustomButton>
    </Flex>
    {open && <Text id={contentId} color="fg.muted" lineHeight="tall" whiteSpace="pre-wrap" mt="2">{content}</Text>}
  </Box>;
};

export default GenericDisclosureText;
