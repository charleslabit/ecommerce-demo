import { fetchBanners } from "@/services";
import { Carousel } from "@mantine/carousel";
import { Flex, Image } from "@mantine/core";
import {
  IconCircleChevronLeft,
  IconCircleChevronRight,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";

export const PromoBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const { data: banners } = useQuery({
    queryKey: ["promo-banners"],
    queryFn: fetchBanners,
  });

  const handleMouseEnter = () => autoplay.current?.stop(); // Stop autoplay on hover
  const handleMouseLeave = () => autoplay.current?.play(); // Restart autoplay when hover ends

  const slides = banners?.map((banner, index) => (
    <Carousel.Slide
      key={banner?.id}
      w={800}
      style={{ opacity: index === activeIndex ? 1 : 0.3 }}
    >
      <Flex justify="center" w={800} h={400}>
        <Image
          className="cursor-pointer"
          h={"auto"}
          w="100%"
          src={banner?.imageUrl}
          alt={banner?.id}
          fit="contain"
          loading="lazy"
        />
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      id="home"
      height={450}
      dragFree
      loop
      slideSize="60%"
      slideGap="xs"
      controlSize={40}
      align={"center"}
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
