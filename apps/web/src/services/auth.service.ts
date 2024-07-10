import instance from "@/utils/axiosInstance";

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const { data } = await instance.post('/auth/forgot-password', { email });
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export const resetPassword = async ({ token, password }: { token: string, password: string }) => {
  try {
    const { data } = await instance.post(
      '/auth/reset-password',
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};