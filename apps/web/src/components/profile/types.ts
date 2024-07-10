export interface FormValues {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  birthDate: string;
  gender: string;
}

export interface FormProps {
  initialId?: string;
  initialName?: string;
  initialEmail?: string;
  initialImage?: string;
  initialPhone?: string;
  initialBirthDate?: string;
  initialGender?: string;
}
