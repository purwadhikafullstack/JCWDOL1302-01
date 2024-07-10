import { Store, User, UserStore } from '@prisma/client';
import {
  createStoreQuery,
  createUserStoreQuery,
  deleteStoreQuery,
  deleteUserStoreQuery,
  getStoreByIDQuery,
  getStoreByNameQuery,
  getStoresQuery,
  getUnassignedUsersByStoreIDQuery,
  getUserStoresQuery,
  getUsersByStoreIDQuery,
  updateStoreQuery,
  updateUserStoreQuery,
} from '../queries/store.query';
import { HttpException } from '../exceptions/HttpException';
import {
  IFilterStore,
  IUserLocation,
  IResultStore,
  IStore,
  IUserStore,
} from '../interfaces/store.interface';
import haversine from 'haversine';
import { MAX_STORE_DISTANCE_IN_KM } from "@/constants/store.constant";

const getStoresAction = async (
  filters: IFilterStore,
): Promise<IResultStore> => {
  try {
    const data = await getStoresQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getStoreByIDAction = async (id: string): Promise<Store | null> => {
  try {
    const store = await getStoreByIDQuery(id);

    if (!store) throw new HttpException(404, 'Data not found');

    return store;
  } catch (err) {
    throw err;
  }
};

const getDistanceStoresAction = async (userLocation: IUserLocation) => {
  try {
    const { stores } = await getStoresQuery({});

    let distanceStores = stores.map(store => {
      const distance =
        userLocation.longitude &&
          userLocation.latitude &&
          store.longitude &&
          store.latitude
          ? haversine(
            {
              longitude: userLocation.longitude,
              latitude: userLocation.latitude,
            },
            {
              longitude: store.longitude,
              latitude: store.latitude,
            },
          )
          : null;
      return { ...store, distance };
    });

    distanceStores = distanceStores.filter(store => store.distance && store.distance <= MAX_STORE_DISTANCE_IN_KM);

    distanceStores = distanceStores.sort(
      (a, b) => (a.distance as number) - (b.distance as number),
    );

    return distanceStores;
  } catch (err) {
    throw err;
  }
};

const createStoreAction = async (storeData: IStore): Promise<Store> => {
  try {
    const existStore = await getStoreByNameQuery(storeData.name);

    if (existStore) throw new Error('Store name already exists');

    const store = await createStoreQuery(storeData);
    return store;
  } catch (err) {
    throw err;
  }
};

const createUserStoreAction = async (data: IUserStore): Promise<UserStore> => {
  try {
    // const existUserStore = await getUnassignedUsersByStoreIDQuery(data.storeId);
    // if (existUserStore) throw new Error('User Store already exists');

    const userStore = await createUserStoreQuery(data);
    return userStore;
  } catch (err) {
    throw err;
  }
};

const updateStoreAction = async (
  id: string,
  storeData: IStore,
): Promise<Store> => {
  try {
    const store = await updateStoreQuery(id, storeData);
    return store;
  } catch (err) {
    throw err;
  }
};

const deleteStoreAction = async (id: string): Promise<Store> => {
  try {
    const store = await deleteStoreQuery(id);
    return store;
  } catch (err) {
    throw err;
  }
};

const getUnassignedUsersByStoreIDAction = async (
  storeId: string,
): Promise<User[]> => {
  try {
    const unassigned = await getUnassignedUsersByStoreIDQuery(storeId);
    if (!unassigned) throw new HttpException(404, 'Data not found');

    return unassigned;
  } catch (err) {
    throw err;
  }
};

const getUsersByStoreIDAction = async (
  storeId: string,
): Promise<UserStore[]> => {
  try {
    const data = await getUsersByStoreIDQuery(storeId);

    return data;
  } catch (err) {
    throw err;
  }
};

const getUserStoresAction = async (storeId: string): Promise<UserStore[]> => {
  try {
    const data = await getUserStoresQuery(storeId);

    return data;
  } catch (err) {
    throw err;
  }
};

const deleteUserStoreAction = async (id: string): Promise<UserStore> => {
  try {
    const userStore = await deleteUserStoreQuery(id);
    return userStore;
  } catch (err) {
    throw err;
  }
};

const updateUserStoreAction = async (
  id: string,
  UserStoreData: IUserStore,
): Promise<UserStore> => {
  try {
    const userStore = await updateUserStoreQuery(id, UserStoreData);
    return userStore;
  } catch (err) {
    throw err;
  }
};

export {
  updateUserStoreAction,
  deleteUserStoreAction,
  getUserStoresAction,
  getUsersByStoreIDAction,
  getUnassignedUsersByStoreIDAction,
  getStoresAction,
  getStoreByIDAction,
  getDistanceStoresAction,
  createStoreAction,
  updateStoreAction,
  deleteStoreAction,
  createUserStoreAction,
};
