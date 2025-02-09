import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export interface LinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
}

export const LinkButton: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
};
