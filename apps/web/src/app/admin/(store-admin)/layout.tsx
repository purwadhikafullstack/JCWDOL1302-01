import AuthStoreAdmin from "@/components/auth/AuthStoreAdmin"
import React from 'react'

const StoreAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthStoreAdmin>{children}</AuthStoreAdmin>
  )
}

export default StoreAdminLayout