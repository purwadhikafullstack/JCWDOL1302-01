import { HttpException } from '@/exceptions/HttpException';
import { IFilterStock, IResultStock, IStock, IUpdateStock } from '@/interfaces/stock.interface';
import {
  createStockQuery,
  getStocksByProductIDQuery,
  getStockByIDQuery,
  updateStockQuery,
  getStockByProductIdAndStoreIdQuery,
  getStocksQuery,
} from '@/queries/stock.query';
import { Stock } from '@prisma/client';

const createStockAction = async (stockData: IStock): Promise<Stock> => {
  try {
    const stock = await createStockQuery(stockData);
    return stock;
  } catch (err) {
    throw err;
  }
};

const updateStockAction = async (
  id: string,
  stockData: IUpdateStock,
): Promise<Stock> => {
  try {
    const stock = await updateStockQuery(id, stockData);
    return stock;
  } catch (err) {
    throw err;
  }
};

const getStocksAction = async (
  filters: IFilterStock,
): Promise<IResultStock> => {
  try {
    const data = await getStocksQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getStocksByProductIDAction = async (
  productId: string,
): Promise<Stock[] | null> => {
  try {
    const stocks = await getStocksByProductIDQuery(productId);

    if (!stocks) throw new HttpException(404, 'Data not found');

    return stocks;
  } catch (error) {
    throw error;
  }
};

const getStockByIDAction = async (id: string): Promise<Stock | null> => {
  try {
    const stock = await getStockByIDQuery(id);

    if (!stock) throw new HttpException(404, 'Data not found');

    return stock;
  } catch (err) {
    throw err;
  }
};

const getStockByProductIdAndStoreIdAction = async (productId: string, storeId: string): Promise<Stock | null> => {
  try {
    if (!productId || !storeId) throw new Error("Please fill product ID and store ID");

    const stock = await getStockByProductIdAndStoreIdQuery(productId, storeId);
    if (!stock) throw new HttpException(404, 'Data not found');

    return stock;
  } catch (err) {
    throw err;
  }
};

export {
  createStockAction,
  updateStockAction,
  getStocksAction,
  getStocksByProductIDAction,
  getStockByIDAction,
  getStockByProductIdAndStoreIdAction,
};
