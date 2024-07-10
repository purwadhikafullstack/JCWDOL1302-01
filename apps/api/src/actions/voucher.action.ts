import { IVoucher } from "@/interfaces/voucher.interface";
import { createVoucherQuery, getVouchersByUserIDQuery } from "@/queries/voucher.query";
import { UserVoucher } from '@prisma/client';

const getVouchersByUserIDAction = async (
  userId: string,
): Promise<UserVoucher[] | null> => {
  try {
    const vouchers = await getVouchersByUserIDQuery(userId);
    return vouchers;
  } catch (err) {
    throw err;
  }
};

const createVoucherAction = async (
  data: IVoucher,
): Promise<UserVoucher> => {
  try {
    const voucher = await createVoucherQuery(data);
    return voucher;
  } catch (err) {
    throw err;
  }
};

export {
  getVouchersByUserIDAction,
  createVoucherAction,
};