import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <button
      className={`${className} inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0`}
      onClick={(e) => {
        console.log("Native button clicked");
        setIsDarkMode((prev) => !prev);
        document.documentElement.classList.toggle("dark");
      }}
      data-testid="theme-toggle"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
