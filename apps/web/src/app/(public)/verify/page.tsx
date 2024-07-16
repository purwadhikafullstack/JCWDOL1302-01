import VerifyPassword from '@/components/verify-password/verifyPassword';
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyPassword />
    </Suspense>
  );
}
