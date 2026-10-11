"use client";

import { Box, HStack, Input, Stack, Text } from "@chakra-ui/react";
import type { GenericUploadProps } from "@/props/custom/media/GenericUploadProps";
import CustomButton from "./CustomButton";
import { useGenericUpload } from "@/hooks/media/useGenericUpload";

const GenericUpload = ({ label, accept, maxFiles, onUpload }: GenericUploadProps) => {
  const { input, files, dragging, setDragging, busy, error, choose, drop, upload } = useGenericUpload({ maxFiles, onUpload });
  return <Stack gap="4">
    <Box borderWidth="2px" borderStyle="dashed" borderColor={dragging ? "green.500" : "border"} bg={dragging ? "green.50" : "bg.subtle"} _dark={dragging ? { bg: "green.900" } : undefined} borderRadius="lg" p="8" textAlign="center"
      onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop}>
      <Text fontSize="4xl" color="green.600" aria-hidden>↥</Text>
      <Text fontWeight="bold">{label}</Text>
      <Text fontSize="sm" color="fg.muted" my="3">Drag files here, or use the button below. Up to {maxFiles} images.</Text>
      <CustomButton appearance="secondary" onClick={() => input.current?.click()}>Choose files</CustomButton>
      <Input ref={input} type="file" accept={accept} multiple={maxFiles > 1} display="none" aria-label={label} onChange={(event) => choose(event.target.files || [])} />
    </Box>
    {files.length > 0 && <><Stack as="ul" listStyleType="none" gap="2">{files.map((file, index) => <HStack as="li" key={`${file.name}-${index}`} justify="space-between" borderBottomWidth="1px" py="2" fontSize="sm"><Text>{file.name}</Text><Text color="fg.muted">{(file.size / 1024 / 1024).toFixed(2)} MB</Text></HStack>)}</Stack><CustomButton loading={busy} loadingText="Uploading..." onClick={upload}>Upload {files.length} file{files.length > 1 ? "s" : ""}</CustomButton></>}
    {error && <Text color="red.500" role="alert" fontSize="sm">{error}</Text>}
  </Stack>;
};

export default GenericUpload;
