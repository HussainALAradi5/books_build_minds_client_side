"use client";

import Link from "next/link";
import { Box, Button, Field, Flex, Grid, Heading, Input, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import CustomButton from "@/Components/custom/CustomButton";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import type { AuthFormProps } from "@/props/auth/AuthFormProps";
import AuthIntro from "./AuthIntro";

const AuthForm = ({ mode }: AuthFormProps) => {
  const { error, busy, passwordVisible, togglePasswordVisibility, submit } = useAuthForm(mode);
  const login = mode === "login";
  return <Box bg="bg.subtle" px={{ base: "4", md: "8" }} py={{ base: "6", md: "10" }} minH="70vh">
    <Grid maxW="6xl" mx="auto" templateColumns={{ base: "1fr", md: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }}
      bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="3xl" overflow="hidden" boxShadow="lg">
      <AuthIntro />
      <Flex direction="column" justify="center" p={{ base: "7", sm: "10", lg: "14" }}>
        <Box maxW="md" w="full" mx="auto">
          <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold">
            <Link href="/">← Back to books</Link>
          </ChakraLink>
          <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest" mt="8">
            {login ? "WELCOME BACK" : "JOIN THE LIBRARY"}
          </Text>
          <Heading as="h2" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", lg: "4xl" }} mt="2">
            {login ? "Sign in to your account" : "Create your account"}
          </Heading>
          <Text color="fg.muted" mt="2" mb="7">
            {login ? "Pick up where your reading left off." : "Your next great read starts here."}
          </Text>
          <form onSubmit={submit}>
            <Stack gap="4">
              {!login && <>
                <Field.Root required><Field.Label>Username</Field.Label>
                  <Input name="userName" autoComplete="username" required minLength={2} size="lg" borderRadius="xl" bg="bg.subtle" />
                </Field.Root>
                <Field.Root required><Field.Label>Email address</Field.Label>
                  <Input name="email" type="email" autoComplete="email" required size="lg" borderRadius="xl" bg="bg.subtle" />
                </Field.Root>
              </>}
              {login && <Field.Root required><Field.Label>Username or email</Field.Label>
                <Input name="identifier" autoComplete="username" required size="lg" borderRadius="xl" bg="bg.subtle" />
              </Field.Root>}
              <Field.Root required><Field.Label>Password</Field.Label>
                <Box position="relative" w="full">
                  <Input name="password" type={passwordVisible ? "text" : "password"} autoComplete={login ? "current-password" : "new-password"}
                    required minLength={8} size="lg" borderRadius="xl" bg="bg.subtle" pr="12" />
                  <Button type="button" variant="ghost" size="sm" position="absolute" right="1" top="1" zIndex="1"
                    aria-label={passwordVisible ? "Hide password" : "Show password"} onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
                  </Button>
                </Box>
                {!login && <Field.HelperText>At least 5 letters and 3 numbers.</Field.HelperText>}
              </Field.Root>
              {error && <Text color="red.500" role="alert" fontSize="sm">{error}</Text>}
              <CustomButton type="submit" size="lg" w="full" borderRadius="xl" mt="2" loading={busy} loadingText="Please wait...">
                {login ? "Sign in" : "Create account"} →
              </CustomButton>
            </Stack>
          </form>
          <Text fontSize="sm" mt="6" color="fg.muted">
            {login ? "New to Books Build Minds?" : "Already have an account?"}{" "}
            <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontWeight="bold">
              <Link href={login ? "/register" : "/login"}>{login ? "Create an account" : "Sign in"}</Link>
            </ChakraLink>
          </Text>
        </Box>
      </Flex>
    </Grid>
  </Box>;
};

export default AuthForm;
