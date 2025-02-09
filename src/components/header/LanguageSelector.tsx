import { useEffect, useState, useRef } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [value, setValue] = useState(() => {
    const match = window.location.pathname.match(/\/([a-z]{2})(?:\/|$)/);
    return match ? match[1] : "en";
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsOpen(false);
    const currentLang = getCurrentLang();
    const newPath = window.location.pathname.replace(
      `/${currentLang}`,
      `/${newLang}`
    );
    window.location.href = newPath;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[40px] h-8 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
      >
        {value.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-[90px] rounded-md border bg-popover text-popover-foreground shadow-md">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleValueChange(lang.code)}
              className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <span className="mr-auto">{lang.name}</span>
              <span className="ml-auto">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
