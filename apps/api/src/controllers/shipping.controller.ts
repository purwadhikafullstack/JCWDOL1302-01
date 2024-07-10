import { sendOrderAction, getCitiesAction, getCouriersAction, getProvincesAction, getSubdistrictsAction } from "@/actions/shipping.action";
import { Request, Response, NextFunction } from "express";

const getProvincesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getProvincesAction();

    res.status(200).json({
      message: "Get provinces success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const getCitiesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const provinceId = req.query.provinceId;
    const data = await getCitiesAction(provinceId as string);

    res.status(200).json({
      message: "Get cities success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const getSubdistrictsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cityId = req.query.cityId;
    const data = await getSubdistrictsAction(cityId as string);

    res.status(200).json({
      message: "Get subdistricts success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const getCouriersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { origin, destination } = req.query;
    const data = await getCouriersAction(origin as string, destination as string);

    res.status(200).json({
      message: "Get couriers success",
      data
    });
  } catch (err) {
    next(err);
  }
}

const sendOrderController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await sendOrderAction(id);

    res.status(200).json({
      message: "Send order success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export {
  getProvincesController,
  getCitiesController,
  getSubdistrictsController,
  getCouriersController,
  sendOrderController,
}
