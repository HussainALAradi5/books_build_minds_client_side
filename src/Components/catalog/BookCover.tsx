import type { BookCoverProps } from "@/props/catalog/BookCoverProps";
import { Box, Image, Text } from "@chakra-ui/react";
import { mediaUrl } from "@/lib/mediaUrl";
import { bookCoverPalette } from "@/features/catalog/bookCoverPalette";
import GenericImagePreview from "@/Components/custom/media/GenericImagePreview";

const BookCover = ({ book, large = false, compact = false }: BookCoverProps) => {
  if (book.bookImage && /^(https:\/\/|\/static\/media\/)/.test(book.bookImage)) {
    const src = mediaUrl(book.bookImage);
    const cover = <Image src={src} alt={`${book.title} cover`} w="full" h={large ? "560px" : compact ? "240px" : "320px"} objectFit="cover" borderRadius="sm" />;
    return large ? <GenericImagePreview src={src} alt={`${book.title} cover`} triggerRadius="md" fullWidth>{cover}</GenericImagePreview> : cover;
  }
  const palette = bookCoverPalette[(book.bookId - 1) % bookCoverPalette.length];
  return <Box bg={palette.background} color={palette.foreground} h={large ? "560px" : compact ? "240px" : "320px"} w="full" position="relative" display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" p={compact ? "5" : "8"} borderRadius="sm" overflow="hidden" aria-label={`${book.title} cover`}>
    <Box position="absolute" inset="3" border="1px solid" borderColor="whiteAlpha.400" pointerEvents="none" />
    <Text position="absolute" top={compact ? "5" : "8"} fontSize="xs" fontWeight="bold" letterSpacing="widest">BOOKS BUILD MINDS</Text>
    <Text fontFamily="heading" fontWeight="semibold" fontSize={large ? { base: "4xl", md: "6xl" } : { base: "xl", md: "2xl" }} lineHeight="1.1" maxW="full" overflowWrap="normal" zIndex="1">{book.title}</Text>
    <Text mt="4" fontSize="xs" letterSpacing="widest" textTransform="uppercase" zIndex="1">{book.author}</Text>
    <Text position="absolute" bottom="3" fontSize={compact ? "3xl" : "5xl"} opacity="0.4" aria-hidden>✳</Text>
  </Box>;
};

export default BookCover;
