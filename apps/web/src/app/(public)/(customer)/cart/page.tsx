import AuthCustomer from "@/components/auth/AuthCustomer";
import Cart from '@/components/cart/Cart';

const page = () => {
  return (
    <AuthCustomer>
      <Cart />
    </AuthCustomer>
  );
};

export default page;
