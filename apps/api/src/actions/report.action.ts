import {
  getSalesReportPerCategoryQuery,
  getSalesReportPerMonthQuery,
  getSalesReportPerProductQuery,
} from '@/queries/report.query';
import { IFilterReport } from '@/interfaces/report.interface';

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

export {
  getSalesReportPerMonthAction,
  getSalesReportPerProductAction,
  getSalesReportPerCategoryAction,
};
