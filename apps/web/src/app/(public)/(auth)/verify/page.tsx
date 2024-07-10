import VerifyView from '@/components/verifyPassword/verifyPassword';
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyView />
    </Suspense>
  );
}
