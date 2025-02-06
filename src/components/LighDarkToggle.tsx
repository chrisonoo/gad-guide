import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Toggle clicked"); // For debugging
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
      data-testid="theme-toggle"
    >
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
