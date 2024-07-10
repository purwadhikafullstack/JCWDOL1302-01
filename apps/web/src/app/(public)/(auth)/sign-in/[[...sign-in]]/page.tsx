import React from 'react';
import LoginView from '@/components/signIn/SignIn';
import { authErrorMessages } from "@/config/auth";

type Props = { searchParams: { callbackUrl?: string, error?: string } };

const Page = ({ searchParams }: Props) => {
  const { callbackUrl = '/', error } = searchParams;
  const authError = error ? authErrorMessages[error] || authErrorMessages.default : null

  return (
    <div>
      <LoginView
        callbackUrl={callbackUrl}
        authError={authError}
      />
    </div>
  );
};

export default Page;
