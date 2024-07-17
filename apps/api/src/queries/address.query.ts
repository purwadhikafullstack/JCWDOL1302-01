import { PrismaClient, UserAddress } from "@prisma/client";
import { IFilterAddress, IResultAddress, IAddress } from "../interfaces/address.interface";

const prisma = new PrismaClient();

const getAddressesQuery = async (filters: IFilterAddress): Promise<IResultAddress> => {
  try {
    const { userId, keyword = "", page = 1, size = 1000 } = filters;
    const conditions: any = {
      label: {
        contains: keyword
      }
    };
    if (userId) conditions.userId = userId;

    const addresses = await prisma.userAddress.findMany({
      where: {
        ...conditions
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.userAddress.aggregate({
      _count: {
        id: true
      },
      where: {
        ...conditions
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { addresses, pages };
  } catch (err) {
    throw err;
  }
}

const getAddressByIDQuery = async (id: string): Promise<UserAddress | null> => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        id
      }
    });

    return address;
  } catch (err) {
    throw err;
  }
}

const getAddressByLabelQuery = async (userId: string, label: string): Promise<UserAddress | null> => {
  try {
    const address = await prisma.userAddress.findFirst({
      where: {
        userId,
        label,
      }
    });

    return address;
  } catch (err) {
    throw err;
  }
}

const createAddressQuery = async (addressData: IAddress): Promise<UserAddress> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const address = await prisma.userAddress.create({
          data: {
            ...addressData,
          }
        });

        if (Boolean(addressData.isDefault)) {
          await prisma.userAddress.updateMany({
            data: {
              isDefault: false,
            },
            where: {
              userId: addressData.userId,
              id: {
                not: address.id,
              }
            }
          });
        }

        return address;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
}

const updateAddressQuery = async (
  id: string,
  addressData: IAddress
): Promise<UserAddress> => {
  try {
    const address = await prisma.userAddress.update({
      data: {
        ...addressData,
      },
      where: {
        id
      }
    });

    if (Boolean(addressData.isDefault)) {
      await prisma.userAddress.updateMany({
        data: {
          isDefault: false,
        },
        where: {
          userId: addressData.userId,
          id: {
            not: address.id,
          }
        }
      });
    }

    return address;
  } catch (err) {
    throw err;
  }
}

const deleteAddressQuery = async (id: string): Promise<UserAddress> => {
  try {
    const address = await prisma.userAddress.delete({
      where: {
        id
      }
    });

    return address;
  } catch (err) {
    throw err;
  }
}

export {
  getAddressesQuery,
  getAddressByIDQuery,
  getAddressByLabelQuery,
  createAddressQuery,
  updateAddressQuery,
  deleteAddressQuery,
}