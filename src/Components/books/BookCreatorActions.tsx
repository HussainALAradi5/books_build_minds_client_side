"use client";

import { Flex, Text } from "@chakra-ui/react";
import CatalogProfile from "@/Components/catalog/CatalogProfile";
import CustomButton from "@/Components/custom/CustomButton";
import GenericFormDialog from "@/Components/custom/forms/GenericFormDialog";
import { useBookCreatorDialog } from "@/hooks/books/useBookCreatorDialog";
import type { BookCreatorActionsProps } from "@/props/books/BookCreatorActionsProps";

const BookCreatorActions = ({ author, publisher }: BookCreatorActionsProps) => {
  const dialog = useBookCreatorDialog();
  const profile = dialog.selected === "author" ? author : publisher;
  return <>
    <Flex gap="2" align="center" wrap="wrap">
      <Text fontSize="sm" fontWeight="semibold" mr="1">People behind this book</Text>
      {author && <CustomButton size="xs" appearance="secondary" onClick={dialog.showAuthor}>About the author</CustomButton>}
      {publisher && <CustomButton size="xs" appearance="secondary" onClick={dialog.showPublisher}>About the publisher</CustomButton>}
    </Flex>
    <GenericFormDialog open={dialog.selected !== null} title={dialog.selected === "author" ? "Author profile" : "Publisher profile"} onClose={dialog.close} size="sm">
      <CatalogProfile label={dialog.selected === "author" ? "Author" : "Publisher"} profile={profile} embedded />
    </GenericFormDialog>
  </>;
};

export default BookCreatorActions;
