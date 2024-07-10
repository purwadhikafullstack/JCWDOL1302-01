'use client';

import React from 'react';
import { Box, Stack, Heading, Container } from '@chakra-ui/react';
import Slider from 'react-slick';
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
  const cards = [
    {
      title: 'You order? We Deliver!',
      image:
        'https://images.unsplash.com/photo-1548695607-9c73430ba065?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y291cmllcnxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: '24 / 7, No matter the weather',
      image:
        'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvdXJpZXJ8ZW58MHx8MHx8fDA%3D',
    },
    {
      title: 'Enjoy 20% Discount for New comers',
      image:
        'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JvY2VyaWVzfGVufDB8fDB8fHww',
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
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
