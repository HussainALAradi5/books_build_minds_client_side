"use client";

import { Box, Button, Dialog, Flex, Image, Portal, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useImageZoom } from "@/hooks/ui/useImageZoom";
import type { GenericImagePreviewProps } from "@/props/custom/media/GenericImagePreviewProps";

const GenericImagePreview = ({ src, alt, children, triggerRadius = "full", fullWidth = false }: GenericImagePreviewProps) => {
  const zoom = useImageZoom();
  return <>
    <Button type="button" variant="plain" onClick={zoom.show} aria-label={`View and zoom ${alt}`} display="block"
      w={fullWidth ? "full" : "fit-content"} minW="0" h="auto" p="0" textAlign="left"
      cursor="zoom-in" borderRadius={triggerRadius} _focusVisible={{ outline: "2px solid", outlineColor: "green.500" }}>
      {children}
    </Button>
    <Dialog.Root open={zoom.open} onOpenChange={({ open }) => { if (!open) zoom.close(); }} placement="center" size="xl">
      <Portal><Dialog.Backdrop /><Dialog.Positioner><Dialog.Content mx="4" maxW="4xl" bg="bg.panel">
        <Dialog.Header><Dialog.Title>{alt}</Dialog.Title></Dialog.Header>
        <Dialog.Body><Box maxH="65vh" overflow="auto" bg="bg.subtle" borderRadius="lg" textAlign="center">
          <Image src={src} alt={alt} w={`${zoom.percent}%`} maxW="none" mx="auto" />
        </Box></Dialog.Body>
        <Dialog.Footer><Flex align="center" gap="2" wrap="wrap">
          <CustomButton appearance="secondary" disabled={zoom.scale <= 1} onClick={zoom.zoomOut} aria-label="Zoom out">−</CustomButton>
          <Text minW="14" textAlign="center" aria-live="polite">{zoom.percent}%</Text>
          <CustomButton appearance="secondary" disabled={zoom.scale >= 3} onClick={zoom.zoomIn} aria-label="Zoom in">+</CustomButton>
          <CustomButton appearance="ghost" disabled={zoom.scale === 1} onClick={zoom.reset}>Reset</CustomButton>
          <CustomButton appearance="secondary" onClick={zoom.close}>Close</CustomButton>
        </Flex></Dialog.Footer>
      </Dialog.Content></Dialog.Positioner></Portal>
    </Dialog.Root>
  </>;
};

export default GenericImagePreview;
