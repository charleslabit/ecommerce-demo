import { useBanners } from "@/hooks";
import { Carousel } from "@mantine/carousel";
import { Flex, Image } from "@mantine/core";
import {
  IconCircleChevronLeft,
  IconCircleChevronRight,
} from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useMemo, useRef, useState } from "react";

export const PromoBannerContainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { data: banners = [] } = useBanners();

  useEffect(() => {
    const autoplayInstance = autoplay.current;
    return () => autoplayInstance?.stop(); // Cleanup on unmount
  }, []);

  const handleMouseEnter = () => autoplay.current?.stop(); // Stop autoplay on hover
  const handleMouseLeave = () => autoplay.current?.play(); // Resume autoplay when hover ends

  const slides = useMemo(
    () =>
      banners.map((banner, index) => (
        <Carousel.Slide
          key={banner.id}
          style={{ opacity: index === activeIndex ? 1 : 0.3 }}
        >
          <Flex justify="center" mah={400}>
            <Image
              className="cursor-pointer"
              h="auto"
              src={banner.imageUrl}
              alt={`Banner ${index + 1}`}
              loading="lazy"
              fit="contain"
            />
          </Flex>
        </Carousel.Slide>
      )),
    [banners, activeIndex]
  );

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
      {slides}
    </Carousel>
  );
};
