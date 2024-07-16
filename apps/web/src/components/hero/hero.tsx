'use client';

import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Container,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
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
    lg: '20px',
  });

  const cards = [
    {
      title: 'You order? We Deliver!',
      image: '/assets/images/courier.jpeg',
      link: '/products',
    },
    {
      title: '24 / 7, No matter the weather',
      image: '/assets/images/courier1.jpeg',
      link: '/products',
    },
    {
      title: 'Fresh groceries at your door',
      image: '/assets/images/groceries.jpeg',
      link: '/products',
    },
  ];

  return (
    <Box
      position={'relative'}
      height={{ base: '200px', sm: '700px' }}
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
          colorScheme="gray"
          variant={'outline'}
          _hover={{ bgColor: 'gray' }}
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt color="white" />
        </IconButton>
        <IconButton
          aria-label="right-arrow"
          colorScheme="gray"
          variant={'outline'}
          _hover={{ bgColor: 'gray' }}
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={99}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt color="white" />
        </IconButton>
      </Box>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={{ base: 'xs', sm: 'lg' }}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Link href={card.link}>
              <Container size="box.lg" height="600px" position="relative">
                <Stack
                  w={'fit'}
                  maxW={'lg'}
                  position="absolute"
                  top={{ base: '15%', sm: '40%' }}
                  transform="translate(0, -50%)"
                  bgGradient={'linear(to-b, whiteAlpha.800, transparent)'}
                  borderRadius={'20'}
                >
                  <Heading
                    fontSize={{ base: 'lg', sm: '4xl' }}
                    fontWeight={'800'}
                    color={'mustard'}
                    textAlign={'center'}
                    borderRadius={'20'}
                    p={2}
                    fontFamily={'Gill sans'}
                    bgGradient={'linear(to-t, whiteAlpha.800, transparent)'}
                  >
                    {card.title}
                  </Heading>
                </Stack>
              </Container>
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
