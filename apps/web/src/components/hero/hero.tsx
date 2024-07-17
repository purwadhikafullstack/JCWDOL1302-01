'use client';

import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import Slider from 'react-slick';
import Link from 'next/link';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Hero() {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({
    base: '150%',
    sm: '35%',
    md: '30%',
    lg: '35%',
  });
  const side = useBreakpointValue({
    base: '30%',
    sm: '10px',
    md: '10px',
    lg: '160px',
  });

  const cards = [
    {
      image: '/assets/images/1.png',
      link: '/products',
    },
    {
      image: '/assets/images/2.png',
      link: '/products',
    },
    {
      image: '/assets/images/3.png',
      link: '/products',
    },
  ];

  return (
    <Box
      position={'relative'}
      height={{ base: '200px', sm: '500px', md: '700px', lg: '700px' }}
      width={'full'}
      overflow={'hidden'}
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
      <Box display={{ base: 'none', sm: 'block', md: 'none', xs: 'none' }}>
        <IconButton
          aria-label="left-arrow"
          colorScheme="green"
          variant={'outline'}
          _hover={{ bgColor: 'white' }}
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt color="green" />
        </IconButton>
        <IconButton
          aria-label="right-arrow"
          colorScheme="green"
          variant={'outline'}
          _hover={{ bgColor: 'white' }}
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={99}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt color="green" />
        </IconButton>
      </Box>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Link href={card.link} key={index}>
            <Box
              key={index}
              height={{ base: 'xs', sm: 'lg' }}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={`url(${card.image})`}
              bgPos={'top'}
            />
          </Link>
        ))}
      </Slider>
    </Box>
  );
}
