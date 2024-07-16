import React from 'react';
import SignIn from '@/components/sign-in/SignIn';
import { authErrorMessages } from "@/config/auth";

// type Props = { searchParams: { callbackUrl?: string, error?: string } };

const SignInPage = () => {
  const searchParams = { callbackUrl: '/', error: null };
  const { callbackUrl = '/', error } = searchParams;
  const authError = error ? authErrorMessages[error] || authErrorMessages.default : null

  return (
    <SignIn
      callbackUrl={callbackUrl}
      authError={authError}
    />
  );
};

export default SignInPage;
