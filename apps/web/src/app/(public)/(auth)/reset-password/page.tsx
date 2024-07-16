import ResetPassword from '@/components/reset-password/ResetPassword';
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default Page;
