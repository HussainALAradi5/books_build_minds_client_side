"use client";

import { Box, Heading } from "@chakra-ui/react";
import MediaUpload from "@/Components/media/MediaUpload";
import GenericForm from "@/Components/custom/GenericForm";
import { bookFormFields } from "@/features/admin/bookFormConfig";
import { useAdminBookForm } from "@/hooks/books/useAdminBookForm";

const AdminBookForm = () => {
  const { error, busy, createdBookId, submit } = useAdminBookForm();
  return <Box><Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p={{ base: "6", md: "8" }} maxW="3xl">
    <Heading as="h2" fontFamily="heading" fontSize="2xl" mb="6">Add a book</Heading>
    <GenericForm fields={bookFormFields} onSubmit={submit} submitLabel="Add book" loading={busy} error={error} />
  </Box>{createdBookId && <MediaUpload bookId={createdBookId} />}</Box>;
};

export default AdminBookForm;
