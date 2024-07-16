import { IVoucher } from "@/interfaces/voucher.interface";
import { PrismaClient, UserVoucher } from '@prisma/client';

const prisma = new PrismaClient();

const getVouchersByUserIDQuery = async (
  userId: string,
): Promise<UserVoucher[] | null> => {
  try {
    const vouchers = await prisma.userVoucher.findMany({
      include: {
        discount: true
      },
      where: {
        userId,
        isUsed: false,
      },
    });

    return vouchers;
  } catch (err) {
    throw err;
  }
};

const createVoucherQuery = async (
  data: IVoucher,
): Promise<UserVoucher> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const voucher = await prisma.userVoucher.create({
          data: {
            ...data
          },
        });

        return voucher;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

export {
  getVouchersByUserIDQuery,
  createVoucherQuery,
};
