import React, { useState } from 'react';
import { Box, Heading, Text, Select, GridItem, Grid } from '@chakra-ui/react';

interface Store {
  id: number;
  name: string;
  // ... other store details
}

const stores: Store[] = [
  {
    id: 1,
    name: 'Store 1',
  },
  {
    id: 2,
    name: 'Store 2',
    // ... other store details
  },
  // ... more stores
];

export default function StoreListPage() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null); // Store state

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStoreId = parseInt(event.target.value);
    setSelectedStore(
      stores.find((store) => store.id === selectedStoreId) || null,
    );
  };

  return (
    <Box className="store-list-page">
      <Heading as="h4" fontSize={{ base: '20px', lg: '18px' }}>
        Our Stores
      </Heading>
      <Select value={selectedStore?.id || ''} onChange={handleStoreChange}>
        {stores.map((store) => (
          <option key={store.id} value={store.id.toString()}>
            {store.name}
          </option>
        ))}
      </Select>
      {selectedStore && ( // Render store details only if a store is selected
        <>
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
            <GridItem key={selectedStore.id}>
              <Box className="store-item">
                <Heading as="h3" fontSize="lg" textAlign="center">
                  {selectedStore.name}
                </Heading>
                <Text mt={2} fontSize="md">
                  {selectedStore.id}
                </Text>
                {/* ... link to store details page */}
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </Box>
  );
}
