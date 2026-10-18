"use client";

import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericFormDialog from "@/Components/custom/forms/GenericFormDialog";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { useBookPrint } from "@/hooks/books/printing/useBookPrint";
import { barcodeTypeColors, barcodeTypeLabels } from "@/enums/books/BarcodeType";
import type { BookPrintActionsProps } from "@/props/books/printing/BookPrintActionsProps";

const BookPrintActions = ({ slug }: BookPrintActionsProps) => {
  const { codes, busy, error, download, toggleCodes, closeCodes } = useBookPrint(slug);
  return <Box>
    <Flex gap="3" wrap="wrap">
      <CustomButton appearance="secondary" disabled={busy} onClick={download}>Download book PDF</CustomButton>
      <CustomButton appearance="ghost" disabled={busy} onClick={toggleCodes}>QR and barcode</CustomButton>
    </Flex>
    {error && <Text role="alert" color="red.500" mt="3">{error}</Text>}
    <GenericFormDialog open={Boolean(codes)} title="Book QR and barcode" onClose={closeCodes} size="sm"><Stack gap="4" align="start">
      <Text fontSize="sm" color="fg.muted">Scan to open this book or identify its library record.</Text>
      {codes && <>
      <Image src={codes.qrImage} alt="QR code linking to this book" width="160px" height="160px" bg="white" />
      <Image src={codes.barcodeImage} alt={`Inventory barcode ${codes.barcodeValue}`} maxW="100%" width="300px" bg="white" p="3" />
      <Flex align="center" gap="2" wrap="wrap"><GenericStatusBadge value={codes.barcodeType} labels={barcodeTypeLabels} colors={barcodeTypeColors} />
        <Text fontSize="sm">{codes.barcodeValue}</Text></Flex>
      </>}
    </Stack></GenericFormDialog>
  </Box>;
};

export default BookPrintActions;
