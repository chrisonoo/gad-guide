import { useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDarkMode((prevValue) => !prevValue);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      type="button"
      onClick={handleClick}
    >
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
