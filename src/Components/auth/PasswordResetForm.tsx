"use client";

import Link from "next/link";
import { Box, Field, Flex, Grid, Heading, Input, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import AuthIntro from "./AuthIntro";
import CustomButton from "@/Components/custom/CustomButton";
import { usePasswordReset } from "@/hooks/auth/usePasswordReset";

const PasswordResetForm = () => {
  const { step, busy, error, message, submit, restart } = usePasswordReset();
  return <Box bg="bg.subtle" px={{ base: "4", md: "8" }} py={{ base: "6", md: "10" }} minH="70vh">
    <Grid maxW="6xl" mx="auto" templateColumns={{ base: "1fr", md: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }}
      bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="3xl" overflow="hidden" boxShadow="lg">
      <AuthIntro />
      <Flex direction="column" justify="center" p={{ base: "7", sm: "10", lg: "14" }}>
        <Box maxW="md" w="full" mx="auto">
          <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/login">← Back to sign in</Link></ChakraLink>
          <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest" mt="8">ACCOUNT RECOVERY</Text>
          <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", lg: "4xl" }} mt="2">Reset your password</Heading>
          <Text color="fg.muted" mt="2" mb="7">{step === "request" ? "We’ll send a six-digit code to the email saved on your account." : "Enter the code from the account's saved email, then choose a new password."}</Text>
          <form onSubmit={submit}><Stack gap="4">
            {step === "request" ? <Field.Root required><Field.Label>Email, username, or mobile number</Field.Label>
              <Input name="identifier" autoComplete="username" required size="lg" borderRadius="xl" bg="bg.subtle" />
            </Field.Root> : <>
              <Field.Root required><Field.Label>Six-digit code</Field.Label>
                <Input name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" required size="lg" borderRadius="xl" bg="bg.subtle" />
              </Field.Root>
              <Field.Root required><Field.Label>New password</Field.Label>
                <Input name="newPassword" type="password" autoComplete="new-password" required minLength={8} size="lg" borderRadius="xl" bg="bg.subtle" />
                <Field.HelperText>At least 5 letters and 3 numbers.</Field.HelperText>
              </Field.Root>
            </>}
            {error && <Text color="red.500" role="alert" fontSize="sm">{error}</Text>}
            {message && <Text color="green.700" _dark={{ color: "green.300" }} role="status" fontSize="sm">{message}</Text>}
            <CustomButton type="submit" size="lg" w="full" borderRadius="xl" loading={busy} loadingText="Please wait...">
              {step === "request" ? "Send reset code" : "Set new password"}
            </CustomButton>
          </Stack></form>
          {step === "confirm" && <CustomButton appearance="ghost" size="sm" mt="5" onClick={restart}>Start again</CustomButton>}
        </Box>
      </Flex>
    </Grid>
  </Box>;
};

export default PasswordResetForm;
