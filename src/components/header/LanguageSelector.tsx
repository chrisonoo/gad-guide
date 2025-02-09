import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "no", name: "Norsk" },
  { code: "pl", name: "Polski" },
];

export function LanguageSelector() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [value, setValue] = useState(() => {
    const match = window.location.pathname.match(/\/([a-z]{2})(?:\/|$)/);
    return match ? match[1] : "en";
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const newPath = window.location.pathname;
      setCurrentPath(newPath);
      const match = newPath.match(/\/([a-z]{2})(?:\/|$)/);
      setValue(match ? match[1] : "en");
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const getCurrentLang = () => {
    const match = currentPath.match(/\/([a-z]{2})(?:\/|$)/);
    return match ? match[1] : "en";
  };

  const handleValueChange = (newLang: string) => {
    setValue(newLang);
    const currentLang = getCurrentLang();
    const newPath = window.location.pathname.replace(
      `/${currentLang}`,
      `/${newLang}`
    );
    window.location.href = newPath;
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[65px] h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
        <SelectValue defaultValue={value}>{value.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[65px] rounded-md border bg-popover text-popover-foreground shadow-md">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground"
          >
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
