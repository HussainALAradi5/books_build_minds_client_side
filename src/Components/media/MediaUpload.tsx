"use client";

import GenericUpload from "@/Components/custom/GenericUpload";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useMediaUpload } from "@/hooks/media/useMediaUpload";
import type { MediaUploadProps } from "@/props/media/MediaUploadProps";

const MediaUpload = ({ bookId }: MediaUploadProps) => {
  const { uploaded, upload } = useMediaUpload(bookId);
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p="7" mt="7" maxW="2xl"><Heading as="h3" fontFamily="heading" fontSize="2xl" mb="2">Add book images</Heading><Text color="fg.muted" fontSize="sm" mb="5">Images are verified and stored by the API. The first upload becomes the book cover.</Text><GenericUpload label="Book images" accept="image/jpeg,image/png,image/gif,image/webp" maxFiles={10} onUpload={upload} />{uploaded.length > 0 && <Text role="status" color="green.600" mt="4">{uploaded.length} image{uploaded.length > 1 ? "s" : ""} uploaded.</Text>}</Box>;
};

export default MediaUpload;
