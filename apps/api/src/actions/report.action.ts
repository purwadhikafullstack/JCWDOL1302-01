import {
  getSalesReportPerCategoryQuery,
  getSalesReportPerMonthQuery,
  getSalesReportPerProductQuery,
  getSalesReportTotalCategoryQuery,
  getSalesReportTotalProductQuery,
  getStockReportDetailQuery,
  getStockReportPerMonthQuery,
} from '@/queries/report.query';
import { IFilterReport, IFilterReportTable } from '@/interfaces/report.interface';

const getSalesReportPerMonthAction = async (filters: IFilterReport) => {
  try {
    const data = await getSalesReportPerMonthQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getSalesReportPerProductAction = async (filters: IFilterReport) => {
  try {
    const data = await getSalesReportPerProductQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getSalesReportPerCategoryAction = async (filters: IFilterReport) => {
  try {
    const data = await getSalesReportPerCategoryQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getSalesReportTotalProductAction = async (filters: IFilterReport) => {
  try {
    const data = await getSalesReportTotalProductQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getSalesReportTotalCategoryAction = async (filters: IFilterReport) => {
  try {
    const data = await getSalesReportTotalCategoryQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getStockReportPerMonthAction = async (filters: IFilterReport) => {
  try {
    const data = await getStockReportPerMonthQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getStockReportDetailAction = async (filters: IFilterReportTable) => {
  try {
    const data = await getStockReportDetailQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

export {
  getSalesReportPerMonthAction,
  getSalesReportPerProductAction,
  getSalesReportPerCategoryAction,
  getSalesReportTotalProductAction,
  getSalesReportTotalCategoryAction,
  getStockReportPerMonthAction,
  getStockReportDetailAction,
};
