"use client";

import { Text } from "@chakra-ui/react";
import GenericForm from "@/Components/custom/GenericForm";
import { bookPriceFormFields } from "@/constants/books/bookPriceFormFields";
import { useBookPriceEdit } from "@/hooks/books/useBookPriceEdit";
import type { BookPriceFormProps } from "@/props/books/BookPriceFormProps";

const BookPriceForm = (props: BookPriceFormProps) => {
  const state = useBookPriceEdit(props);
  return <><Text color="fg.muted" mb="5">Current price: {props.book.price.toFixed(3)} BHD. Book identity, creators, condition, and copy count are fixed after creation.</Text>
    <GenericForm fields={bookPriceFormFields.map((field) => ({ ...field, defaultValue: String(props.book.price) }))}
      onSubmit={state.submit} submitLabel="Save price" loading={state.busy} error={state.error} compact /></>;
};

export default BookPriceForm;
