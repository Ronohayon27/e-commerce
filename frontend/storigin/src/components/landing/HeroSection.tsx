"use client";

import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { HERO_DATA } from "@/data/heroesData";

export function HeroSection() {
  const heroData = HERO_DATA;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplay] = useState(
    Autoplay({ delay: 10000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative">
        <Carousel setApi={setApi} className="w-full" plugins={[autoplay]}>
          <div className="rounded-xl overflow-hidden">
            <CarouselContent>
              {heroData.map((item, index) => (
                <CarouselItem key={index} className="w-full">
                  <Card className="bg-muted shadow-lg rounded-xl">
                    <CardContent className="flex flex-col-reverse md:flex-row items-center justify-between p-8 gap-6 md:h-[28rem]">
                      {/* TEXT */}
                      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                        <h1 className="text-4xl font-bold leading-tight">
                          {item.title}
                        </h1>
                        <p className="text-muted-foreground text-lg">
                          {item.subtitle}
                        </p>
                        <Button variant="default" className="mt-4">
                          Buy Now
                        </Button>
                      </div>

                      {/* IMAGE */}
                      <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full max-w-md object-contain"
                          priority
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          <CarouselPrevious
            onClick={() => {
              if (api) {
                api.scrollPrev();
                autoplay.reset();
              }
            }}
          />
          <CarouselNext
            onClick={() => {
              if (api) {
                api.scrollNext();
                autoplay.reset();
              }
            }}
          />
        </Carousel>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              current - 1 === i ? "bg-black" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
