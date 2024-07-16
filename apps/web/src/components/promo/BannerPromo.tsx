'use client';

import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({
    base: '90%',
    lg: '50%',
    md: '50%',
    sm: '500%',
  });
  const side = useBreakpointValue({
    base: '30%',
    lg: '10px',
    md: '20px',
    sm: '100px',
  });

  const cards = [
    '/assets/images/Diskon.gif',
    '/assets/images/Gratis.gif',
    '/assets/images/Minimum.gif',
    '/assets/images/B1G1.gif',
  ];

  return (
    <Box
      position={'relative'}
      height={{ base: '320px', sm: '430px' }}
      width={'full'}
      overflow={'hidden'}
      p={{ base: 0, sm: 15 }}
      mb={{ base: 0, sm: 20 }}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Box display={{ base: 'none', sm: 'block', md: 'none', lg: 'block' }}>
        <IconButton
          aria-label="left-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
          ml={{ base: 0, sm: 40 }}
        >
          <BiLeftArrowAlt size={30} />
        </IconButton>
        <IconButton
          aria-label="right-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}
          mr={{ base: 0, sm: 40 }}
        >
          <BiRightArrowAlt size={30} />
        </IconButton>
      </Box>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Box
            key={index}
            height={'sm'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
  );
}
