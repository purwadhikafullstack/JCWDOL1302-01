import { IVoucher } from "@/interfaces/voucher.interface";
import { PrismaClient, UserVoucher } from '@prisma/client';
import { addMonths } from "date-fns";

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
        OR: [
          {
            expiredDate: {
              lt: new Date(),
            },
          },
          {
            expiredDate: null,
          },
        ]
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
            ...data,
            createdDate: new Date(),
            expiredDate: addMonths(new Date(), 3),
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
