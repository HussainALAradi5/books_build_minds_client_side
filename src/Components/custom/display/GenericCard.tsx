import { Box, Card } from "@chakra-ui/react";
import type { GenericCardProps } from "@/props/custom/display/GenericCardProps";

const GenericCard = ({ children, media, footer }: GenericCardProps) => (
  <Card.Root as="article" width="full" minW="0" height="full" overflow="hidden" borderRadius="2xl"
    bg="bg.panel" borderColor="border.subtle" boxShadow="xs">
    {media && <Box bg="bg.subtle" borderBottomWidth="1px" borderColor="border.subtle">{media}</Box>}
    <Card.Body gap="3" p={{ base: "5", md: "6" }}>{children}</Card.Body>
    {footer && <Card.Footer px={{ base: "5", md: "6" }} pb="5" pt="0" mt="auto">{footer}</Card.Footer>}
  </Card.Root>
);

export default GenericCard;
