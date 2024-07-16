import { PrismaClient, Store, User, UserStore } from '@prisma/client';
import {
  IFilterStore,
  IResultStore,
  IStore,
  IUserStore,
} from '../interfaces/store.interface';

const prisma = new PrismaClient();

const getStoresQuery = async (filters: IFilterStore): Promise<IResultStore> => {
  try {
    const { keyword = '', page = 1, size = 1000 } = filters;

    const stores = await prisma.store.findMany({
      where: {
        name: {
          contains: keyword,
        },
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.store.aggregate({
      _count: {
        id: true,
      },
      where: {
        name: {
          contains: keyword,
        },
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { stores, pages };
  } catch (err) {
    throw err;
  }
};

const getStoreByIDQuery = async (id: string): Promise<Store | null> => {
  try {
    const store = await prisma.store.findUnique({
      include: {
        userStores: {
          include: {
            user: true,
          },
        },
      },
      where: {
        id,
      },
    });

    return store;
  } catch (err) {
    throw err;
  }
};

const getStoreByNameQuery = async (name: string): Promise<Store | null> => {
  try {
    const store = await prisma.store.findFirst({
      where: {
        name,
      },
    });

    return store;
  } catch (err) {
    throw err;
  }
};

const createStoreQuery = async (storeData: IStore): Promise<Store> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const store = await prisma.store.create({
          data: {
            ...storeData,
          },
        });

        if (Boolean(storeData.isDefault)) {
          await prisma.store.updateMany({
            data: {
              isDefault: false,
            },
            where: {
              id: {
                not: store.id,
              }
            }
          });
        }

        return store;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateStoreQuery = async (
  id: string,
  storeData: IStore,
): Promise<Store> => {
  try {
    const store = await prisma.store.update({
      data: {
        ...storeData,
      },
      where: {
        id,
      },
    });

    if (Boolean(storeData.isDefault)) {
      await prisma.store.updateMany({
        data: {
          isDefault: false,
        },
        where: {
          id: {
            not: store.id,
          }
        }
      });
    }

    return store;
  } catch (err) {
    throw err;
  }
};

const deleteStoreQuery = async (id: string): Promise<Store> => {
  try {
    const store = await prisma.store.delete({
      where: {
        id,
      },
    });

    return store;
  } catch (err) {
    throw err;
  }
};

const createUserStoreQuery = async (data: IUserStore): Promise<UserStore> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const userStore = await prisma.userStore.create({
          data: {
            ...data,
          },
        });

        return userStore;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const getUnassignedUsersByStoreIDQuery = async (
  storeId: string,
): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          name: 'store_admin',
        },
      },
    });

    const userStores = await prisma.userStore.findMany({
      // where: {
      //   storeId,
      // },
    });

    const unassignUsers = users.filter((user) => {
      let isUnassign = true;
      userStores.forEach((userStore) => {
        if (userStore.userId === user.id) {
          isUnassign = false;
        }
      });
      return isUnassign;
    });

    return unassignUsers;
  } catch (err) {
    throw err;
  }
};

const getUsersByStoreIDQuery = async (
  storeId: string,
): Promise<UserStore[]> => {
  try {
    const users = await prisma.userStore.findMany({
      include: {
        user: true,
      },
      where: {
        storeId,
      },
    });

    return users;
  } catch (err) {
    throw err;
  }
};

const getUserStoresQuery = async (storeId: string): Promise<UserStore[]> => {
  try {
    const users = await prisma.userStore.findMany({
      include: {
        user: true,
      },
      where: {
        storeId,
      },
    });

    return users;
  } catch (err) {
    throw err;
  }
};

const deleteUserStoreQuery = async (id: string): Promise<UserStore> => {
  try {
    const userStore = await prisma.userStore.delete({
      where: {
        id,
      },
    });

    return userStore;
  } catch (err) {
    throw err;
  }
};

const updateUserStoreQuery = async (
  id: string,
  userStoreData: IUserStore,
): Promise<UserStore> => {
  try {
    const store = await prisma.userStore.update({
      data: {
        ...userStoreData,
      },
      where: {
        id,
      },
    });

    return store;
  } catch (err) {
    throw err;
  }
};

export {
  updateUserStoreQuery,
  deleteUserStoreQuery,
  getUserStoresQuery,
  getUsersByStoreIDQuery,
  getStoresQuery,
  getStoreByIDQuery,
  getStoreByNameQuery,
  createStoreQuery,
  updateStoreQuery,
  deleteStoreQuery,
  createUserStoreQuery,
  getUnassignedUsersByStoreIDQuery,
};
