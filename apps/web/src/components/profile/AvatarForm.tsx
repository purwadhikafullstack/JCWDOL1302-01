"use client";

import { useAppDispatch } from "@/lib/hooks";
import { SmallCloseIcon } from "@chakra-ui/icons"
import { Avatar, AvatarBadge, Center, FormControl, IconButton, Input, Stack } from "@chakra-ui/react"
import { toast } from "react-toastify";
import { updateAvatar } from '@/lib/features/auth/authSlice';

type Props = {
  id: string;
  image?: string;
}

const AvatarForm = ({ id, image }: Props) => {
  const dispatch = useAppDispatch();

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const inputFile = document.getElementById('image') as HTMLInputElement;
      const file = inputFile?.files?.item(0) as File;
      if (!file.name) return;

      formData.append('image', file);

      const result = await dispatch(updateAvatar(id, formData));
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
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/avatar/${image}`}
            >
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
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