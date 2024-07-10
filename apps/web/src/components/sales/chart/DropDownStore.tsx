// Import Components
import React from 'react';
import { Box, Select, Text } from '@chakra-ui/react';

// Define Store Data (Dummy Data)
const storeNames: string[] = [
  'Toko Sembako Maju Jaya',
  'Toko Daging Sapi Segar',
  'Toko Elektronik Murah',
  'Toko Fashion Terbaru',
  'Toko Buku Gramedia',
  'Toko Obat Sehat',
  'Toko Alat Tulis Lengkap',
  'Toko Kosmetik Cantik',
  'Toko Sepeda Terlengkap',
  'Toko Bahan Bangunan Murah',
];

// Create the Dropdown Component
const StoreDropdown: React.FC = () => {
  // Define State for Selected Store
  const [selectedStore, setSelectedStore] = React.useState<string>(
    storeNames[0],
  );

  // Handle Store Change
  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(event.target.value);
  };

  return (
    <Box>
      <Text> Store </Text>
      <Select value={selectedStore} onChange={handleStoreChange}>
        {storeNames.map((storeName) => (
          <option key={storeName} value={storeName}>
            {storeName}
          </option>
        ))}
      </Select>
    </Box>
  );
};

// Use the Dropdown Component
export default function App() {
  return (
    <div>
      <StoreDropdown />
      {/* Your other Next.js components or content can go here */}
    </div>
  );
}
