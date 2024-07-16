'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, TableContainer, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import {
  getCities,
  getProvinces,
  getSubdistricts,
} from '@/services/shipping.service';
import { getStoreByID, updateStore } from '@/services/store.service';
import { toast } from 'react-toastify';
import EditStoreForm from './EditStoreForm';

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [subdistricts, setSubdistricts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    subdistrictId: '',
    subdistrictName: '',
    longitude: 0,
    latitude: 0,
    isDefault: false,
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getStoreByID(id);
      setFormData({
        name: data.name,
        address: data.address,
        provinceId: data.provinceId,
        provinceName: data.provinceName,
        cityId: data.cityId,
        cityName: data.cityName,
        subdistrictId: data.subdistrictId,
        subdistrictName: data.subdistrictName,
        longitude: data.longitude,
        latitude: data.latitude,
        isDefault: data.isDefault,
      });
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const data = await getProvinces();
      setProvinces(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getCities(formData.provinceId);
      setCities(data);
    })();
  }, [formData.provinceId]);

  useEffect(() => {
    (async () => {
      const data = await getSubdistricts(formData.cityId);
      setSubdistricts(data);
    })();
  }, [formData.cityId]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLonglat = (longitude: number, latitude: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      longitude,
      latitude,
    }));
  };

  const handleChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    const provinceName =
      provinces.find((province) => province.province_id === provinceId)
        ?.province || '';

    setFormData({
      ...formData,
      provinceId,
      provinceName,
      cityId: '',
      cityName: '',
      subdistrictId: '',
      subdistrictName: '',
    });
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    const cityName =
      cities.find((city) => city.city_id === cityId)?.city_name || '';

    setFormData({
      ...formData,
      cityId,
      cityName,
      subdistrictId: '',
      subdistrictName: '',
    });
  };

  const handleChangeSubdistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subdistrictId = e.target.value;
    const subdistrictName =
      subdistricts.find(
        (subdistrict) => subdistrict.subdistrict_id === subdistrictId,
      )?.subdistrict_name || '';

    setFormData({
      ...formData,
      subdistrictId,
      subdistrictName,
    });
  };

  const handleChangeIsDefault = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isDefault: !prevFormData.isDefault,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const store = await updateStore(id, formData);
      if (!store) throw new Error('Update store failed!');
      toast.success('Update store success');
      router.push('/admin/stores');
    } catch (err) {
      console.error(err);
      toast.error('Update store failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Store Management
      </Text>
      <Card my={10}>
        <CardBody>
          <TableContainer>
            <EditStoreForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleChangeProvince={handleChangeProvince}
              handleChangeCity={handleChangeCity}
              handleChangeSubdistrict={handleChangeSubdistrict}
              handleChangeIsDefault={handleChangeIsDefault}
              provinces={provinces}
              cities={cities}
              subdistricts={subdistricts}
              handleChangeLonglat={handleChangeLonglat}
            />
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
