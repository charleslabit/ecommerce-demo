import { useBanners } from "@/hooks";
import { Carousel } from "@mantine/carousel";
import { Box } from "@mantine/core";
import {
  IconCircleChevronLeft,
  IconCircleChevronRight,
} from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export const PromoBannerContainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { data: banners = [] } = useBanners();

  useEffect(() => {
    const instance = autoplay.current; // Store ref in a variable

    return () => {
      if (instance) instance.stop();
    };
  }, []);

  // Memoized handlers
  const handleMouseEnter = useCallback(() => autoplay.current?.stop(), []);
  const handleMouseLeave = useCallback(() => autoplay.current?.play(), []);

  return (
    <Carousel
      id="home"
      dragFree
      loop
      slideSize="60%"
      slideGap="xs"
      controlSize={40}
      align="center"
      nextControlIcon={<IconCircleChevronRight />}
      previousControlIcon={<IconCircleChevronLeft />}
      withIndicators
      onSlideChange={setActiveIndex}
      plugins={[autoplay.current]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {banners.map((banner, index) => (
        <Carousel.Slide
          key={banner.id}
          style={{ opacity: index === activeIndex ? 1 : 0.3 }}
        >
          <Box pos="relative" w="100%" h={400}>
            <Image
              className="cursor-pointer"
              src={banner.imageUrl}
              alt={`Banner ${index + 1}`}
              fill
              priority={index === 0} // First image loads eagerly
              quality={80}
            />
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
