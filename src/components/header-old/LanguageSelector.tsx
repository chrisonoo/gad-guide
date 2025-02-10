import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "no", name: "Norsk", flag: "🇳🇴" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
];

export function LanguageSelector() {
    const [currentLang, setCurrentLang] = useState(() => {
        const match = window.location.pathname.match(/\/([a-z]{2})(?:\/|$)/);
        return match ? match[1] : "en";
    });

    const handleLanguageChange = (newLang: string) => {
        setCurrentLang(newLang);
        const newPath = window.location.pathname.replace(
            `/${currentLang}`,
            `/${newLang}`
        );
        window.location.href = newPath;
    };

    return (
        <Select onValueChange={handleLanguageChange} value={currentLang}>
            <SelectTrigger className="flex justify-center items-center hover:bg-accent hover:text-accent-foreground h-9 w-9 text-sm p-0 border-0 [&>svg]:hidden ">
                <SelectValue>{currentLang.toUpperCase()}</SelectValue>
            </SelectTrigger>
            <SelectContent className="w-[120px]" sideOffset={5}>
                {languages.map((lang) => (
                    <SelectItem
                        key={lang.code}
                        value={lang.code}
                        className={currentLang === lang.code ? "bg-accent" : ""}
                    >
                        <div className="flex w-[75px] justify-between">
                            <span>{lang.name}</span>
                            <span>{lang.flag}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
