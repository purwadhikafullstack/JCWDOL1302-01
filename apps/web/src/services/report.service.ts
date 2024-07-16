import { IFilterReport, IFilterReportTable } from '@/interface/report.interface';
import instance from '@/utils/axiosInstance';

export const getSalesReportPerMonth = async ({
  year = '',
  storeId = '',
}: IFilterReport) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/sales/month?year=${year}&storeId=${storeId}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};

export const getSalesReportPerProduct = async ({
  year = '',
  storeId = '',
}: IFilterReport) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/sales/product?year=${year}&storeId=${storeId}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};

export const getSalesReportPerCategory = async ({
  year = '',
  storeId = '',
}: IFilterReport) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/sales/category?year=${year}&storeId=${storeId}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};

export const getSalesReportTotalProduct = async ({
  year = '',
  storeId = '',
}: IFilterReport) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/sales/product/total?year=${year}&storeId=${storeId}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};

export const getSalesReportTotalCategory = async ({
  year = '',
  storeId = '',
}: IFilterReport) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/sales/category/total?year=${year}&storeId=${storeId}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};

export const getStockReportPerMonth = async ({
  year = '',
  storeId = '',
}: IFilterReport) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/stock/month?year=${year}&storeId=${storeId}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};

export const getStockReportDetail = async ({
  year = '',
  month = '',
  storeId = '',
  keyword = "",
  page = 1,
  size = 10,
}: IFilterReportTable) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(
      `/report/stock/detail?year=${year}&month=${month}&storeId=${storeId}&keyword=${keyword}&page=${page}&size=${size}`,
      config,
    );
    const report = data?.data;
    return report;
  } catch (err) {
    console.error(err);
  }
};