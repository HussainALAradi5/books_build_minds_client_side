"use client";

import CustomButton from "@/Components/custom/CustomButton";
import GenericFormDialog from "@/Components/custom/forms/GenericFormDialog";
import BookPriceForm from "./BookPriceForm";
import { useEditDialog } from "@/hooks/ui/useEditDialog";
import type { BookEditActionProps } from "@/props/books/BookEditActionProps";

const BookEditAction = ({ book }: BookEditActionProps) => {
  const dialog = useEditDialog();
  return <><CustomButton appearance="secondary" onClick={dialog.openDialog}>Edit price</CustomButton>
    <GenericFormDialog open={dialog.open} title={`Edit price: ${book.title}`} onClose={dialog.closeDialog} size="sm">
      <BookPriceForm book={book} onSaved={dialog.closeDialog} />
    </GenericFormDialog></>;
};

export default BookEditAction;
