import { UserAddress } from "@prisma/client";
import { createAddressQuery, deleteAddressQuery, getAddressByIDQuery, getAddressByLabelQuery, getAddressesQuery, updateAddressQuery } from "../queries/address.query";
import { HttpException } from "../exceptions/HttpException";
import { IFilterAddress, IResultAddress, IAddress } from "../interfaces/address.interface";

const getAddressesAction = async (filters: IFilterAddress): Promise<IResultAddress> => {
  try {
    const data = await getAddressesQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
}

const getAddressByIDAction = async (id: string): Promise<UserAddress | null> => {
  try {
    const address = await getAddressByIDQuery(id);

    if (!address) throw new HttpException(404, "Data not found");

    return address;
  } catch (err) {
    throw err;
  }
}

const createAddressAction = async (addressData: IAddress): Promise<UserAddress> => {
  try {
    const existAddress = await getAddressByLabelQuery(addressData.userId, addressData.label);

    if (existAddress?.id) throw new Error("Address label already exists");

    const address = await createAddressQuery(addressData);
    return address;
  } catch (err) {
    throw err;
  }
}

const updateAddressAction = async (
  id: string,
  addressData: IAddress
): Promise<UserAddress> => {
  try {
    const address = await updateAddressQuery(id, addressData);
    return address;
  } catch (err) {
    throw err;
  }
}

const deleteAddressAction = async (id: string): Promise<UserAddress> => {
  try {
    const address = await deleteAddressQuery(id);
    return address;
  } catch (err) {
    throw err;
  }
}

export {
  getAddressesAction,
  getAddressByIDAction,
  createAddressAction,
  updateAddressAction,
  deleteAddressAction,
}