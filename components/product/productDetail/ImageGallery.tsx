"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import { ImageGallery } from "@/app/types/product";

export default function ImageGallery({ images, title }: ImageGallery) {
    const [api, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setActiveIndex(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollTo = (index: number) => {
        api?.scrollTo(index);
    };

    return (
        <div className="space-y-4">
            <Carousel
                setApi={setApi}
                opts={{ loop: true }}
                className="w-full"
            >
                <CarouselContent>
                    {images.map((img, i) => (
                        <CarouselItem key={i}>
                            <div className="relative aspect-square rounded-[8px] border overflow-hidden ">
                                <Image
                                    src={img}
                                    alt={`${title} – image ${i + 1}`}
                                    fill
                                    className="object-contain p-6 transition-all duration-300"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority={i === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {images.length > 1 && (
                    <>
                        <CarouselPrevious className="left-3 top-1/2  border shadow-sm" />
                        <CarouselNext className="right-3 top-1/2  border shadow-sm" />
                    </>
                )}
            </Carousel>

            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`View image ${i + 1}`}
                            className={`relative shrink-0 h-16 w-16 rounded-lg border-2 overflow-hidden ${i === activeIndex
                                ? "border-primary"
                                : "border-transparent hover:border-border"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${title} thumbnail ${i + 1}`}
                                fill
                                className="object-contain p-1"
                                sizes="64px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
