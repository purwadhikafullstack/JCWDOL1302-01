import React from "react";
import AuthCustomer from "@/components/auth/AuthCustomer"

const CustomerLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthCustomer>{children}</AuthCustomer>
  )
}

export default CustomerLayout