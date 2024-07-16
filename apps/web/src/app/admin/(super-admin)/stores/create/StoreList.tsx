import Map from '@/components/stores/Map';
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
  TableContainer,
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  handleChangeProvince: any;
  handleChangeCity: any;
  handleChangeSubdistrict: any;
  handleChangeIsDefault: any;
  provinces: any;
  cities: any;
  subdistricts: any;
  handleChangeLonglat: any;
};
const StoreList = ({
  formData,
  handleChange,
  handleSubmit,
  handleChangeProvince,
  handleChangeCity,
  handleChangeSubdistrict,
  handleChangeIsDefault,
  provinces,
  cities,
  subdistricts,
  handleChangeLonglat,
}: Props) => {
  const router = useRouter();

  return (
    <Card my={10}>
      <CardBody>
        <TableContainer>
          <form onSubmit={handleSubmit}>
            <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
              <FormControl id="name" isRequired>
                <FormLabel>Store Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Name"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Textarea
                  name="address"
                  placeholder="Address"
                  _placeholder={{ color: 'gray.500' }}
                  value={formData.address}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="province" isRequired>
                <FormLabel>Province</FormLabel>
                <Select
                  width="auto"
                  value={formData.provinceId}
                  onChange={handleChangeProvince}
                >
                  <option value=""></option>
                  {provinces?.map((province: any) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Select
                  width="auto"
                  value={formData.cityId}
                  onChange={handleChangeCity}
                >
                  <option value=""></option>
                  {cities?.map((city: any) => (
                    <option
                      key={city.city_id}
                      value={city.city_id}
                    >{`${city.type} ${city.city_name}`}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="subdistrict" isRequired>
                <FormLabel>Subdistrict</FormLabel>
                <Select
                  width="auto"
                  value={formData.subdistrictId}
                  onChange={handleChangeSubdistrict}
                >
                  <option value=""></option>
                  {subdistricts?.map((subdistrict: any) => (
                    <option
                      key={subdistrict.subdistrict_id}
                      value={subdistrict.subdistrict_id}
                    >
                      {subdistrict.subdistrict_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Map handleChangeLonglat={handleChangeLonglat} />
              <FormControl id="longitude">
                <FormLabel>Longitude</FormLabel>
                <Input
                  name="longitude"
                  placeholder="Longitude"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  value={formData.longitude}
                  readOnly
                />
              </FormControl>
              <FormControl id="latitude">
                <FormLabel>Latitude</FormLabel>
                <Input
                  name="latitude"
                  placeholder="Latitude"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  value={formData.latitude}
                  readOnly
                />
              </FormControl>
              <FormControl id="isDefault">
                <FormLabel>Is Default Store?</FormLabel>
                <Switch
                  isChecked={formData.isDefault}
                  onChange={handleChangeIsDefault}
                />
              </FormControl>
              <Stack spacing={6} direction={['column', 'row']} mt={15}>
                <Button
                  onClick={() => {
                    router.push('/admin/stores');
                  }}
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </form>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default StoreList;
