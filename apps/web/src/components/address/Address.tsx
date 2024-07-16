'use client';

import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Heading,
  Text,
  Checkbox,
} from '@chakra-ui/react';

const provinces = [
  { id: 1, name: 'Province 1' },
  { id: 2, name: 'Province 2' },
];

const addresses = [];

export default function CityAddressPage(): JSX.Element {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [label, setLabel] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'street':
        setStreet(value);
        break;
      case 'subdistrict':
        setSubDistrict(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'postalCode':
        setPostalCode(value);
        break;
      default:
        break;
    }
  };

  const handleSaveAddress = () => {
    if (window.confirm('Are you sure you want to save the address?')) {
      if (isAddingNew) {
        addresses.push({
          id: Math.random().toString(),
          street,
          city,
          subDistrict,
          postalCode,
          provinceId: selectedProvinceId,
        });
      } else {
      }
      setSelectedAddressId(null);
      setIsAddingNew(false);
      setStreet('');
      setCity('');
      setSubDistrict('');
      setPostalCode('');
      setSelectedProvinceId('');
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={4} w={'full'} maxW={'md'} p={6} my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>

        <FormControl>
          <Checkbox
            isChecked={isAddingNew}
            onChange={() => setIsAddingNew(!isAddingNew)}
          >
            Use this Address
          </Checkbox>
        </FormControl>

        <Button variant="outline" onClick={() => setIsAddingNew(true)}>
          Add New Address
        </Button>

        {isAddingNew ? (
          <Text fontWeight="bold">Add New Address</Text>
        ) : (
          <Text fontWeight="bold">Edit Address</Text>
        )}
        <FormControl id="label" isRequired>
          <FormLabel>Mark Address As</FormLabel>
          <Input
            name="label"
            value={label}
            onChange={handleInputChange}
            placeholder="Enter Label"
          />
        </FormControl>

        <Stack spacing={4}>
          <FormControl id="province">
            <FormLabel>Province</FormLabel>
            <Select
              placeholder="Select Province"
              value={selectedProvinceId}
              onChange={(e) => setSelectedProvinceId(e.target.value)}
            >
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              name="city"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter City"
            />
          </FormControl>
          <FormControl id="subdistrict">
            <FormLabel>Subdistrict</FormLabel>
            <Input
              name="subdistrict"
              value={subDistrict}
              onChange={handleInputChange}
              placeholder="Enter Subdistrict"
            />
          </FormControl>
          <FormControl id="street" isRequired>
            <FormLabel>Street</FormLabel>
            <Input
              name="street"
              value={street}
              onChange={handleInputChange}
              placeholder="Enter Street Address"
            />
          </FormControl>
          <FormControl id="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <Input
              name="postalCode"
              value={postalCode}
              onChange={handleInputChange}
              placeholder="Enter Postal Code"
            />
          </FormControl>
        </Stack>
        <Button colorScheme="blue" onClick={handleSaveAddress}>
          Save Address
        </Button>
      </Stack>
    </Flex>
  );
}
