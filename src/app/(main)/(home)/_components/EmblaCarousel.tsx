"use client";
import React from "react";
import tw, { createVariables } from "~/lib/tw";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDotButton, usePrevNextButtons } from "~/hooks/carouselHook";

interface EmblaCarouselProps {
   slides: string[];
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides }) => {
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
      Autoplay({ delay: 3000 }),
   ]);

   const { selectedIndex, scrollSnaps, onDotButtonClick } =
      useDotButton(emblaApi);

   const { onPrevButtonClick, onNextButtonClick } =
      usePrevNextButtons(emblaApi);

   const variables = createVariables(
      "[--slide-height:16.5rem]",
      "md:[--slide-height:22.5rem]",
      "[--slide-spacing:1rem]",
      "[--slide-size:100%]"
   );

   const setAutoPlay = (type: string) => {
      // @ts-ignore: Thư viện Type lỗi
      const autoplay = emblaApi?.plugins(Autoplay).autoplay;

      if (type === "stop") {
         // @ts-ignore: Thư viện Type lỗi
         autoplay?.stop?.();
      }
      if (type === "play") {
         // @ts-ignore: Thư viện Type lỗi
         autoplay?.play?.();
      }
   };

   return (
      <div
         className={tw("relative", variables)}
         onMouseEnter={() => setAutoPlay("stop")}
         onMouseLeave={() => setAutoPlay("play")}
      >
         <div className="overflow-hidden rounded" ref={emblaRef}>
            <div className="ml-[calc(var(--slide-spacing)*-1)] flex touch-pan-y">
               {slides.map((slide, index) => (
                  <div
                     className="flex-shrink-0 basis-full pl-[--slide-spacing]"
                     key={index}
                  >
                     <div className="image-cover h-[--slide-height] rounded bg-gray-500">
                        <Image
                           src={slide}
                           width={800}
                           height={420}
                           alt="123"
                           className="h-full w-full object-cover"
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <Button
            isIconOnly
            color="default"
            size="lg"
            radius="full"
            onClick={onPrevButtonClick}
            className="absolute left-3 top-1/2 -translate-y-1/2 shadow-lg"
            aria-label="previos"
         >
            <ChevronLeft />
         </Button>
         <Button
            isIconOnly
            color="default"
            radius="full"
            size="lg"
            onClick={onNextButtonClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 shadow-lg"
            aria-label="next"
         >
            <ChevronRight />
         </Button>

         {/* PAGINATION  */}
         <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center">
            {scrollSnaps.map((_, index) => (
               <button
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={tw(
                     "before:transition-ease flex h-8 w-8 touch-manipulation items-center justify-center before:block before:h-2 before:w-2 before:rounded-full before:bg-[--gray-300-color] before:shadow-lg",
                     index === selectedIndex &&
                        "before:w-6 before:bg-[--gray-500-color]"
                  )}
               />
            ))}
         </div>
      </div>
   );
};

export default EmblaCarousel;
