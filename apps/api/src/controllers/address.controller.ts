import { Request, Response, NextFunction } from "express";
import { createAddressAction, deleteAddressAction, getAddressByIDAction, getAddressesAction, updateAddressAction } from "../actions/address.action";

const getAddressesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getAddressesAction(filters);

    res.status(200).json({
      message: "Get addresses success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const getAddressByIDController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getAddressByIDAction(id);

    res.status(200).json({
      message: "Get address success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const createAddressController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const params = req.body;

    const data = await createAddressAction({
      ...params,
      subdistrictId: Number(params.subdistrictId),
      cityId: Number(params.cityId),
      provinceId: Number(params.provinceId),
    });

    res.status(200).json({
      message: "Create address success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const updateAddressController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const params = req.body;

    const data = await updateAddressAction(id, {
      ...params,
      subdistrictId: Number(params.subdistrictId),
      cityId: Number(params.cityId),
      provinceId: Number(params.provinceId),
    });

    res.status(200).json({
      message: "Update address success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const deleteAddressController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteAddressAction(id);

    res.status(200).json({
      message: "Delete address success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export {
  getAddressesController,
  getAddressByIDController,
  createAddressController,
  updateAddressController,
  deleteAddressController,
}
