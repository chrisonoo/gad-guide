import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Definicja interfejsu, który opisuje strukturę pojedynczego obiektu memu
interface MemeItem {
  id: number; // Unikalny identyfikator memu
  title: string; // Tytuł memu
  description: string; // Opis memu
  image: string; // URL obrazu memu
}

// Tablica obiektów typu MemeItem, która zawiera przykładowe dane memów
const memeItems: MemeItem[] = [
  {
    id: 1,
    title: "Programista vs Błędy",
    description: "Gdy twój kod działa za pierwszym razem",
    image: "https://picsum.photos/800/400?random=1",
  },
  {
    id: 2,
    title: "Spotkania, które mogły być e-mailami",
    description: "Kolejne niepotrzebne spotkanie w pracy",
    image: "https://picsum.photos/800/400?random=2",
  },
  {
    id: 3,
    title: "Deadline się zbliża",
    description: "Ja, próbujący skończyć projekt na czas",
    image: "https://picsum.photos/800/400?random=3",
  },
  {
    id: 4,
    title: "Stack Overflow to życie",
    description: "Gdy znajdujesz idealne rozwiązanie na Stack Overflow",
    image: "https://picsum.photos/800/400?random=4",
  },
  {
    id: 5,
    title: "CSS to magia",
    description: "Próbujesz centrować div za pomocą CSS",
    image: "https://picsum.photos/800/400?random=5",
  },
  {
    id: 6,
    title: "Debugowanie w produkcji",
    description: "Gdy znajdujesz błąd na produkcji",
    image: "https://picsum.photos/800/400?random=6",
  },
  {
    id: 7,
    title: "Kawa programisty",
    description: "Poziom kawy vs poziom kodu",
    image: "https://picsum.photos/800/400?random=7",
  },
  {
    id: 8,
    title: "Dokumentacja? Jaka dokumentacja?",
    description: "Gdy przejmujesz projekt bez dokumentacji",
    image: "https://picsum.photos/800/400?random=8",
  },
  {
    id: 9,
    title: "Mistrz Ctrl+C Ctrl+V",
    description: "Kopiowanie kodu ze Stack Overflow",
    image: "https://picsum.photos/800/400?random=9",
  },
  {
    id: 10,
    title: "Życie z AI",
    description: "Gdy AI pisze lepszy kod niż ty",
    image: "https://picsum.photos/800/400?random=10",
  },
];

export function MemeGallery() {
  // useState: stan przechowujący liczbę memów, które aktualnie są widoczne w galerii.
  // Początkowo pokazujemy 3 memy.
  const [visibleItems, setVisibleItems] = useState(3);

  // useRef: tworzymy referencję do elementu DOM, który będziemy obserwować, aby zaimplementować "infinite scroll".
  // galleryRef jest referencją do div, który pojawi się na końcu listy memów.
  const galleryRef = useRef<HTMLDivElement>(null);

  // useRef: tworzymy referencję do tablicy elementów obrazów, aby móc śledzić każdy z nich w celu lazy loadingu.
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // useEffect: efekt, który odpowiada za ładowanie obrazów (lazy loading) przy użyciu IntersectionObserver.
  useEffect(() => {
    // Tworzymy obserwatora, który sprawdza, czy element (obraz) znajduje się w widoku użytkownika.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Jeśli obraz jest widoczny (przynajmniej 10% - threshold: 0.1),
          if (entry.isIntersecting) {
            // Rzutujemy obserwowany element na HTMLImageElement
            const img = entry.target as HTMLImageElement;
            // Ustawiamy właściwe źródło obrazu, pobierając je z atrybutu data-src
            img.src = img.dataset.src || "";
            // Przestajemy obserwować ten obraz, ponieważ został już załadowany
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 } // 10% elementu musi być widoczne, aby wywołać callback
    );

    // Dla każdego obrazu przechowywanego w imageRefs, jeśli zawiera on placeholder,
    // dodajemy go do obserwatora, aby mógł być później załadowany, gdy wejdzie do widoku.
    imageRefs.current.forEach((img) => {
      if (img && img.src.includes("placeholder")) {
        observer.observe(img);
      }
    });

    // Funkcja czyszcząca, która odłącza obserwatora od wszystkich obrazów przy odmontowywaniu komponentu.
    return () => {
      imageRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, []); // Pusty array zależności oznacza, że efekt uruchomi się tylko raz, przy montowaniu komponentu

  // useEffect: aktualizuje tablicę imageRefs, przycinając ją do liczby widocznych elementów.
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, visibleItems);
  }, [visibleItems]); // Efekt wywołuje się przy każdej zmianie visibleItems

  // useEffect: efekt implementujący mechanizm "infinite scroll", czyli ładowanie kolejnych memów,
  // gdy użytkownik zbliża się do końca galerii.
  useEffect(() => {
    // Tworzymy obserwatora dla elementu wskazującego koniec galerii.
    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        // Jeśli pierwszy obserwowany element (nasz div z galleryRef) jest widoczny
        // i nie pokazaliśmy jeszcze wszystkich memów,
        if (entries[0].isIntersecting && visibleItems < memeItems.length) {
          // Zwiększamy liczbę widocznych elementów o 3 (ale nie przekraczamy długości tablicy memeItems)
          setVisibleItems((prev) => Math.min(prev + 3, memeItems.length));
        }
      },
      { threshold: 0.1 } // Element musi być w 10% widoczny, aby wywołać callback
    );

    // Jeśli element galleryRef jest dostępny, dodajemy go do obserwatora
    if (galleryRef.current) {
      loadMoreObserver.observe(galleryRef.current);
    }

    // Funkcja czyszcząca: przy odmontowywaniu komponentu lub zmianie efektu, przestajemy obserwować element galleryRef
    return () => {
      if (galleryRef.current) {
        loadMoreObserver.unobserve(galleryRef.current);
      }
    };
  }, [visibleItems]); // Efekt zależy od visibleItems, więc uruchamia się przy każdej jego zmianie

  // Renderowanie komponentu
  return (
    // Główny kontener galerii z ustalonym maksymalnym rozmiarem, centrowaniem oraz paddingiem
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Mapujemy tablicę memeItems, ale renderujemy tylko te elementy, które mieszczą się w zakresie visibleItems */}
        {memeItems.slice(0, visibleItems).map((item, index) => (
          // Komponent Card reprezentujący pojedynczy mem
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              {/* Nagłówek wyświetlający tytuł memu, pozycjonowany absolutnie nad obrazem */}
              <h3 className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center z-10">
                {item.title}
              </h3>
              {/* Dialog - komponent wyświetlający powiększony obraz w modalnym oknie */}
              <Dialog>
                {/* DialogTrigger - element, który po kliknięciu otwiera dialog.
                    Używamy asChild, aby opakować dowolny element, który ma pełnić rolę triggera */}
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    {/* Obraz memu z implementacją lazy loading */}
                    <img
                      // Przypisujemy referencję do obrazu, aby później móc obserwować jego widoczność
                      ref={(el) => {
                        imageRefs.current[index] = el;
                        // Jeśli obraz zawiera placeholder (czyli nie został jeszcze załadowany),
                        // tworzymy lokalnego obserwatora, który załaduje właściwy obraz, gdy ten wejdzie do widoku.
                        if (el && el.src.includes("placeholder")) {
                          const observer = new IntersectionObserver(
                            ([entry]) => {
                              if (entry.isIntersecting) {
                                // Gdy obraz stanie się widoczny, ustawiamy właściwy URL obrazu
                                el.src = item.image || "/placeholder.svg";
                                // Po załadowaniu przerywamy obserwację dla tego obrazu
                                observer.disconnect();
                              }
                            },
                            { threshold: 0.1 }
                          );
                          observer.observe(el);
                        }
                      }}
                      data-src={item.image || "/placeholder.svg"} // Atrybut przechowujący rzeczywisty URL obrazu do lazy loadingu
                      alt={item.title} // Atrybut alt dla dostępności, opisujący obraz
                      className="w-full h-64 object-cover" // Klasy CSS definiujące wymiary obrazu oraz sposób skalowania
                      src="/placeholder.svg" // Początkowe źródło obrazu (placeholder) wyświetlane, zanim zostanie załadowany właściwy obraz
                    />
                  </div>
                </DialogTrigger>
                {/* DialogContent - zawartość modala, wyświetlająca powiększony obraz */}
                <DialogContent className="max-w-full max-h-screen p-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-contain" // Obraz dostosowany do kontenera, zachowując proporcje
                  />
                </DialogContent>
              </Dialog>
            </div>
            {/* CardContent - sekcja zawierająca opis memu */}
            <CardContent>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Jeśli nie wyświetlono jeszcze wszystkich memów, renderujemy dodatkowy element div,
          do którego przypisujemy referencję galleryRef.
          Ten element służy jako "trigger" dla infinite scroll, gdy wejdzie do widoku */}
      {visibleItems < memeItems.length && (
        <div ref={galleryRef} className="h-10" />
      )}
    </div>
  );
}
