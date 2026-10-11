"use client";

import { Button } from "@chakra-ui/react";
import type { CustomButtonProps } from "@/props/custom/actions/CustomButtonProps";
import { useAsyncButton } from "@/hooks/ui/useAsyncButton";

const CustomButton = ({ loading = false, loadingText, disabled, onClick, children, type = "button", appearance = "primary", ...props }: CustomButtonProps) => {
  const { busy, handleClick } = useAsyncButton(onClick, loading);
  return <Button {...props} type={type} disabled={disabled || busy} loading={busy} loadingText={loadingText} onClick={handleClick}
    colorPalette="green" variant={appearance === "primary" ? "solid" : appearance === "secondary" ? "outline" : "ghost"}
    bg={appearance === "primary" ? "green.700" : undefined} color={appearance === "primary" ? "white" : undefined}
    _dark={appearance === "primary" ? { bg: "green.300", color: "green.950" } : undefined}>
    {children}
  </Button>;
};

export default CustomButton;
