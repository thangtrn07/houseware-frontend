'use client';
import { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useEffect, useState } from 'react';

export const usePrevNextButtons = (
   emblaApi?: EmblaCarouselType,
   onButtonClick?: (emblaApi?: EmblaCarouselType) => void
) => {
   const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
   const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

   const onPrevButtonClick = useCallback(() => {
      if (!emblaApi) return;
      emblaApi.scrollPrev();
      if (onButtonClick) onButtonClick(emblaApi);
   }, [emblaApi, onButtonClick]);

   const onNextButtonClick = useCallback(() => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
      if (onButtonClick) onButtonClick(emblaApi);
   }, [emblaApi, onButtonClick]);

   const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
   }, []);

   useEffect(() => {
      if (!emblaApi) return;

      onSelect(emblaApi);
      emblaApi.on('reInit', onSelect);
      emblaApi.on('select', onSelect);
   }, [emblaApi, onSelect]);

   return {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
   };
};

export const useDotButton = (
   emblaApi?: EmblaCarouselType,
   onButtonClick?: (emblaApi?: EmblaCarouselType) => void
) => {
   const [selectedIndex, setSelectedIndex] = useState<number>(0);
   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

   const onDotButtonClick = useCallback(
      (index: number) => {
         if (!emblaApi) return;
         emblaApi.scrollTo(index);
         if (onButtonClick) onButtonClick(emblaApi);
      },
      [emblaApi, onButtonClick]
   );

   const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList());
   }, []);

   const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
   }, []);

   useEffect(() => {
      if (!emblaApi) return;

      onInit(emblaApi);
      onSelect(emblaApi);
      emblaApi.on('reInit', onInit);
      emblaApi.on('reInit', onSelect);
      emblaApi.on('select', onSelect);
   }, [emblaApi, onInit, onSelect]);

   return {
      selectedIndex,
      scrollSnaps,
      onDotButtonClick
   };
};
