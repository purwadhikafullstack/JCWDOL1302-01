import AuthSuperAdmin from "@/components/auth/AuthSuperAdmin"
import React from 'react'

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthSuperAdmin>{children}</AuthSuperAdmin>
  )
}

export default SuperAdminLayout