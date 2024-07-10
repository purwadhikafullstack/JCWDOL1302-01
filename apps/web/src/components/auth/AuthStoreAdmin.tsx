'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { checkToken, signOut } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  url?: string;
}

export default function AuthStoreAdmin({ children, url = '/' }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (typeof window !== undefined) {
        const token = localStorage.getItem('token');
        if (!token) return router.push(url);

        const result = await dispatch(checkToken(token));
        if (!result?.role) {
          dispatch(signOut());
          router.push(url);
        }

        if (result?.role?.name !== "store_admin") {
          router.push(url);
        } else {
          setIsLoading(false);
        }
      }
    })();
  }, [dispatch, router, url]);

  if (isLoading) return <></>;

  return <>{children}</>;
}