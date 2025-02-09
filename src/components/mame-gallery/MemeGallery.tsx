import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type MemeItem, memeItems } from "@/components/mame-gallery/MemeData";

export function MemeGallery() {
  const [visibleItems, setVisibleItems] = useState(3);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((img) => {
      if (img && img.src.includes("placeholder")) {
        observer.observe(img);
      }
    });

    return () => {
      imageRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, []);

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, visibleItems);
  }, [visibleItems]);

  useEffect(() => {
    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleItems < memeItems.length) {
          setVisibleItems((prev) => Math.min(prev + 3, memeItems.length));
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      loadMoreObserver.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        loadMoreObserver.unobserve(galleryRef.current);
      }
    };
  }, [visibleItems]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {memeItems.slice(0, visibleItems).map((item, index) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              <h3 className="absolute top-0 left-0 right-0 bg-black/50 text-white text-base font-normal p-2 text-center z-10">
                {item.title}
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <img
                      ref={(el) => {
                        imageRefs.current[index] = el;
                        if (el && el.src.includes("placeholder")) {
                          const observer = new IntersectionObserver(
                            ([entry]) => {
                              if (entry.isIntersecting) {
                                el.src = item.image || "/placeholder.svg";
                                observer.disconnect();
                              }
                            },
                            { threshold: 0.1 }
                          );
                          observer.observe(el);
                        }
                      }}
                      data-src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                      src="/placeholder.svg" // Placeholder image
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-full max-h-screen p-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </DialogContent>
              </Dialog>
            </div>
            <CardContent>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {visibleItems < memeItems.length && (
        <div ref={galleryRef} className="h-10" />
      )}
    </div>
  );
}
