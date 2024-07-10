'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Flex } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ProductSlider: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <Box
            mt={2}
            h="400px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            mt={2}
            h="400px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            mt={2}
            h="400px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            mt={2}
            h="400px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            h="400px"
            bgImage="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2023/10/12/sayur-bayam-hijau-1-1jpg-20231012011526.jpg"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box
            h="100px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            h="100px"
            bgImage="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2023/10/12/sayur-bayam-hijau-1-1jpg-20231012011526.jpg"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            h="100px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            h="100px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Box
            h="100px"
            bgImage="https://sesa.id/cdn/shop/files/Bayam-Hijau-Organik-1-removebg-preview.png?v=1683175431"
            bgPos="center"
            bgSize="cover"
          />
        </SwiperSlide>
        {/* ... other slides */}
      </Swiper>
    </>
  );
};

export default ProductSlider;
