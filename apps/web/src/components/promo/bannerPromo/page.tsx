'use client';

import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 200,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  // These are the images used in the slide
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
      bgImage={'/assets/images/bgline1.png'}
      bgSize={{ base: 'unset', sm: 'cover' }}
      bgPos={{ base: 'left', sm: 'bottom' }}
    >
      {/* CSS files for react-slick */}
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
      <Box display={{ base: 'none', sm: 'block' }}>
        {/* Left Icon */}
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
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
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
          <BiRightArrowAlt />
        </IconButton>
      </Box>
      {/* Slider */}
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
