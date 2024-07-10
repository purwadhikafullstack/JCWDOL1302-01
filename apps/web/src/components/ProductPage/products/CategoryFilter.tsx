import React, { useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

interface Category {
  name: string;
  subCategories?: string[]; // Optional subcategories
}

const categories: Category[] = [
  { name: 'Sayur' },
  { name: 'Buah' },
  { name: 'Beras' },
  { name: 'Protein' },
  { name: 'Susu dan Olahan' },
  { name: 'Bumbu Dapur' },
];

const CategoryFilter: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, sm: true }); // Detect mobile and small screens
  const { isOpen, onOpen, onClose } = useDisclosure(); // Manage filter visibility

  const toggleFilter = () => (isOpen ? onClose() : onOpen()); // Open/Close filter

  function handleCategoryClick(name: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {isMobile && ( // Only render button on mobile and small screens
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Filter"
          onClick={toggleFilter}
        />
      )}
      <Box
        as="aside"
        width="200px"
        mr={isOpen ? 2 : 0} // Margin for open state (optional)
        display={isOpen ? 'block' : 'none'} // Conditional display
        borderRight="1px solid"
        borderColor="gray.200"
        p={4}
      >
        <Heading fontSize="md" mb={4}>
          Select from Categories
        </Heading>
        <Accordion allowMultiple>
          {categories.map((category) => (
            <AccordionItem key={category.name}>
              <AccordionButton
                onClick={() => handleCategoryClick(category.name)} // Your category click handler
                _expanded={{ backgroundColor: 'gray.100', color: 'teal.500' }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight="semibold">{category.name}</Text>
                </Box>
                {category.subCategories && <AccordionIcon />}
              </AccordionButton>
              {category.subCategories && (
                <AccordionPanel pb={4}>
                  <Stack spacing={2}>
                    {category.subCategories.map((subCategory) => (
                      <Text key={subCategory}>{subCategory}</Text>
                    ))}
                  </Stack>
                </AccordionPanel>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </>
  );
};

export default CategoryFilter;
