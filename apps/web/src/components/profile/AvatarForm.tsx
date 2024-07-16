"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Avatar, Center, FormControl, Input, Stack } from "@chakra-ui/react"
import { toast } from "react-toastify";
import { updateAvatar } from '@/lib/features/auth/authSlice';

const AvatarForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const inputFile = document.getElementById('image') as HTMLInputElement;
      const file = inputFile?.files?.item(0) as File;
      if (!file.name) return;

      formData.append('image', file);

      const result = await dispatch(updateAvatar(user.id as string, formData));
      if (!result) throw new Error('Update Avatar Failed');
      toast.success('Update Avatar Success');
    } catch (err) {
      console.error(err);
      toast.error(
        'Update avatar failed! Please upload file with extension .jpg, .jpeg, .png, .gif and maximum size 1MB!',
      );
    }
  };

  return (
    <Stack spacing={6} w={'full'} rounded={'xl'} p={10} mt={6} pb={0}>
      <FormControl id="avatar">
        <Stack spacing={4}>
          <Center>
            <Avatar
              size="xl"
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/avatar/${user.image}`}
            />
          </Center>
          <Center w="full">
            <Input
              type="file"
              id="image"
              name="image"
              onChange={handleUpdateAvatar}
            />
          </Center>
        </Stack>
      </FormControl>
    </Stack>
  )
}

export default AvatarForm