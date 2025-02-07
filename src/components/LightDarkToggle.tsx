import { useState } from "react";
import { SunIcon, MoonIcon, DesktopIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type Props = {
  className?: string;
};

export function LightDarkToggle({ className }: Props) {
  const localStorageTheme =
    localStorage.theme !== undefined ? localStorage.theme : false;
  const isSystemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  let themeModeState = 0;

  if (localStorageTheme === false || localStorageTheme === "dark") {
    themeModeState = 0;
  } else if (localStorageTheme === "light") {
    themeModeState = 1;
  } else {
    themeModeState = 2;
  }

  const [themeMode, setThemeMode] = useState(themeModeState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setThemeMode((prevValue) => {
      const newValue = (prevValue + 1) % 3;
      switch (newValue) {
        case 0:
          localStorage.theme = "dark";
          document.documentElement.classList.add("dark");
          break;
        case 1:
          localStorage.theme = "light";
          document.documentElement.classList.remove("dark");
          break;
        case 2:
          localStorage.theme = "";
          document.documentElement.classList.toggle("dark", isSystemThemeDark);
          break;
      }
      return newValue;
    });
  };

  const getIcon = () => {
    switch (themeMode) {
      case 0:
        return <MoonIcon />;
      case 1:
        return <SunIcon />;
      case 2:
        return <DesktopIcon />;
      default:
        return <MoonIcon />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      type="button"
      onClick={handleClick}
    >
      {getIcon()}
    </Button>
  );
}
