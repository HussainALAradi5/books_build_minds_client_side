"use client";

import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { useBookPrint } from "@/hooks/books/printing/useBookPrint";
import { barcodeTypeColors, barcodeTypeLabels } from "@/enums/books/BarcodeType";
import type { BookPrintActionsProps } from "@/props/books/printing/BookPrintActionsProps";

const BookPrintActions = ({ slug }: BookPrintActionsProps) => {
  const { codes, busy, error, download, toggleCodes } = useBookPrint(slug);
  return <Box mt="6" borderTopWidth="1px" pt="5">
    <Flex gap="3" wrap="wrap">
      <CustomButton appearance="secondary" disabled={busy} onClick={download}>Download book PDF</CustomButton>
      <CustomButton appearance="secondary" disabled={busy} onClick={toggleCodes} aria-expanded={Boolean(codes)}>
        {codes ? "Hide codes" : "Show QR and barcode"}
      </CustomButton>
    </Flex>
    <Text fontSize="sm" color="fg.muted" mt="2">Printable book details and library codes. Open the PDF to print at actual size.</Text>
    {error && <Text role="alert" color="red.500" mt="3">{error}</Text>}
    {codes && <Stack gap="4" mt="4" align="start">
      <Image src={codes.qrImage} alt="QR code linking to this book" width="160px" height="160px" bg="white" />
      <Image src={codes.barcodeImage} alt={`Inventory barcode ${codes.barcodeValue}`} maxW="100%" width="300px" bg="white" p="3" />
      <Flex align="center" gap="2" wrap="wrap"><GenericStatusBadge value={codes.barcodeType} labels={barcodeTypeLabels} colors={barcodeTypeColors} />
        <Text fontSize="sm">{codes.barcodeValue}</Text></Flex>
    </Stack>}
  </Box>;
};

export default BookPrintActions;
