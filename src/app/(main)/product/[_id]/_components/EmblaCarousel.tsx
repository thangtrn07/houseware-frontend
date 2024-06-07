"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import tw, { createVariables } from "~/lib/tw";

type ThumbProps = {
   selected: boolean;
   image: string;
   onClick: () => void;
};

export const Thumb: React.FC<ThumbProps> = (props) => {
   const { selected, image, onClick } = props;

   return (
      <button
         onClick={onClick}
         type="button"
         className={tw(
            "ml-[--thumbs-slide-spacing] aspect-square shrink-0 basis-14 overflow-hidden rounded-md border border-[--gray-400-color]",
            selected && "border-2 border-[--red-color]"
         )}
      >
         <picture className="image-cover aspect-square rounded-md bg-gray-400">
            <Image src={image} width={600} height={600} alt="123" />
         </picture>
      </button>
   );
};

type EmblaCarouselProps = {
   slides: string[];
};

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides }) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
   const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
      containScroll: "keepSnaps",
      dragFree: true,
   });

   const onThumbClick = useCallback(
      (index: number) => {
         if (!emblaMainApi || !emblaThumbsApi) return;
         emblaMainApi.scrollTo(index);
      },
      [emblaMainApi, emblaThumbsApi]
   );

   const onSelect = useCallback(() => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      setSelectedIndex(emblaMainApi.selectedScrollSnap());
      emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
   }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

   useEffect(() => {
      if (!emblaMainApi) return;
      onSelect();
      emblaMainApi.on("select", onSelect);
      emblaMainApi.on("reInit", onSelect);
   }, [emblaMainApi, onSelect]);

   const variables = createVariables(
      "[--slide-spacing:0.6rem]",
      "[--thumbs-slide-spacing:0.6rem]"
   );

   return (
      <div className={tw(variables, "w-full")}>
         <div
            className="border-item overflow-hidden rounded-md"
            ref={emblaMainRef}
         >
            <div className="ml-[calc(var(--slide-spacing)*-1)] flex touch-pan-y">
               {slides.map((slide, index) => (
                  <div
                     className="flex-shrink-0 basis-full pl-[--slide-spacing]"
                     key={index}
                  >
                     <picture className="image-containt aspect-square rounded-md bg-gray-400">
                        <Image src={slide} width={600} height={600} alt="123" />
                     </picture>
                  </div>
               ))}
            </div>
         </div>

         <div className="mt-[--thumbs-slide-spacing]">
            <div className="overflow-hidden" ref={emblaThumbsRef}>
               <div className="ml-[calc(var(--thumbs-slide-spacing)*-1)] flex">
                  {slides.map((image, index) => (
                     <Thumb
                        key={index}
                        onClick={() => onThumbClick(index)}
                        selected={index === selectedIndex}
                        image={image}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default EmblaCarousel;
