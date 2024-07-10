import ResetPassword from '@/components/resetPassword/ResetPassword';
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default Page;
