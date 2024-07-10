import instance from "@/utils/axiosInstance";

export const getVouchersByUserID = async (userId: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/vouchers/user/${userId}`, config);
    const vouchers = data?.data;
    return vouchers;
  } catch (err) {
    console.error(err);
  }
};