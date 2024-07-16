import React from 'react';
import AuthUser from '@/components/auth/AuthUser';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthUser>
      <div className="grid gap-4 place-content-center h-48 min-h-screen">
        {children}
      </div>
    </AuthUser>
  );
}
