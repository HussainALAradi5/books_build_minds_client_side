"use client";

import Link from "next/link";
import { Box, Field, Grid, Heading, Input, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import type { AuthFormProps } from "@/props/auth/AuthFormProps";

const AuthForm = ({ mode }: AuthFormProps) => {
  const { error, busy, submit } = useAuthForm(mode);
  return <Grid templateColumns={{ base: "1fr", md: "2fr 3fr" }} minH="75vh">
    <Box bg="green.100" _dark={{ bg: "green.900" }} p={{ base: "9", md: "16" }} position="relative" overflow="hidden">
      <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">A NEW CHAPTER STARTS HERE</Text>
      <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "5xl", md: "6xl" }} lineHeight="1.1" mt="8">Stories worth<br /><Text as="em" color="green.700" _dark={{ color: "green.300" }}>sharing.</Text></Heading>
      <Text color="fg.muted" lineHeight="tall" maxW="sm" mt="7">Explore a thoughtful collection of books and make space for your next favorite idea.</Text>
      <Text aria-hidden fontSize="9xl" color="green.300" _dark={{ color: "green.700" }} position="absolute" bottom="-20" right="-4">✳</Text>
    </Box>
    <Box p={{ base: "8", md: "16" }} bg="bg.panel">
      <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/">← Back to books</Link></ChakraLink>
      <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest" mt="14">{mode === "login" ? "WELCOME BACK" : "JOIN THE COMMUNITY"}</Text>
      <Heading as="h2" fontFamily="heading" fontWeight="medium" fontSize="4xl" mt="4">{mode === "login" ? "Sign in to your account" : "Create your account"}</Heading>
      <Text color="fg.muted" mt="2" mb="8">{mode === "login" ? "Your bookshelf is waiting." : "Your next great read is a few steps away."}</Text>
      <form onSubmit={submit}><Stack gap="5" maxW="md">
        {mode === "register" && <><Field.Root required><Field.Label>Username</Field.Label><Input name="userName" autoComplete="username" required minLength={2} /></Field.Root><Field.Root required><Field.Label>Email address</Field.Label><Input name="email" type="email" autoComplete="email" required /></Field.Root></>}
        {mode === "login" && <Field.Root required><Field.Label>Username or email</Field.Label><Input name="identifier" autoComplete="username" required /></Field.Root>}
        <Field.Root required><Field.Label>Password</Field.Label><Input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={8} /><Field.HelperText>At least 5 letters and 3 numbers.</Field.HelperText></Field.Root>
        {error && <Text color="red.500" role="alert" fontSize="sm">{error}</Text>}
        <CustomButton type="submit" loading={busy} loadingText="Please wait...">{mode === "login" ? "Sign in" : "Create account"} →</CustomButton>
      </Stack></form>
      <Text fontSize="sm" mt="7">{mode === "login" ? "New to Books Build Minds?" : "Already have an account?"} <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontWeight="bold"><Link href={mode === "login" ? "/register" : "/login"}>{mode === "login" ? "Create an account" : "Sign in"}</Link></ChakraLink></Text>
    </Box>
  </Grid>;
};

export default AuthForm;
