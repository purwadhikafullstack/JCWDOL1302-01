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

  const top = useBreakpointValue({ base: '90%', sm: '35%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', sm: '10px', md: '10px' });

  const cards = [
    {
      title: 'You order? We Deliver!',
      image:
        'https://images.unsplash.com/photo-1548695607-9c73430ba065?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y291cmllcnxlbnwwfHwwfHx8MA%3D%3D',
      link: '/products',
    },
    {
      title: '24 / 7, No matter the weather',
      image:
        'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvdXJpZXJ8ZW58MHx8MHx8fDA%3D',
      link: '/products',
    },
    {
      title: 'Enjoy 20% Discount for New comers',
      image:
        'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JvY2VyaWVzfGVufDB8fDB8fHww',
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
