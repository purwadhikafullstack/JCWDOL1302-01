export interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface FormProps {
  initialCurrentPassword?: string;
  initialNewPassword?: string;
  initialConfirmPassword?: string;
}
