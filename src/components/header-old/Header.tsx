import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";

export default function Header() {
    return (
        <div className="absolute top-4 right-4 flex items-center gap-1">
            <ThemeToggle />
            <LanguageSelector />
        </div>
    );
}
