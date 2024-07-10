import { PrismaClient } from '@prisma/client';
import { IFilterReport } from '@/interfaces/report.interface';
import { COLORS } from '@/constants/color.constant';

const prisma = new PrismaClient();

const getSalesReportPerMonthQuery = async (filters: IFilterReport) => {
  try {
    const { year = '', storeId = '' } = filters;
    const report: any[] = await prisma.$queryRawUnsafe(`
      with master_month as (
          select '01' month union all
          select '02' month union all
          select '03' month union all
          select '04' month union all
          select '05' month union all
          select '06' month union all
          select '07' month union all
          select '08' month union all
          select '09' month union all
          select '10' month union all
          select '11' month union all
          select '12' month
      ), 
      master_total as (
          select date_format(order_date, '%m') as month, sum(1) as total
          from orders
          where store_id like '%${storeId}%'
          and date_format(order_date, '%Y') like '%${year}%'
          group by month
          order by month
      ),
      master_output as (
        select a.month, coalesce(b.total, 0) total
        from master_month a
        left join master_total b on a.month = b.month
      )
      select *
      from master_output;
    `);

    return [
      {
        label: 'Penjualan',
        data: report.map((item) => Number(item?.total)),
        backgroundColor: COLORS[0].backgroundColor,
      },
    ];
  } catch (err) {
    throw err;
  }
};

const getSalesReportPerProductQuery = async (filters: IFilterReport) => {
  try {
    const { year = '', storeId = '' } = filters;
    const report: any[] = await prisma.$queryRawUnsafe(`
      with master_month as (
        select '01' month union all
        select '02' month union all
        select '03' month union all
        select '04' month union all
        select '05' month union all
        select '06' month union all
        select '07' month union all
        select '08' month union all
        select '09' month union all
        select '10' month union all
        select '11' month union all
        select '12' month
      ), 
      master_total_month as (
          select date_format(a.order_date, '%m') as month, b.product_id, sum(b.quantity + b.bonus_quantity) as total 
          from orders a, order_items b
          where a.id = b.order_id
          and a.store_id like '%${storeId}%'
          and date_format(a.order_date, '%Y') like '%${year}%'
          group by date_format(a.order_date, '%m'), b.product_id
      ),
      master_group as (
        select a.name product_name, b.month, coalesce(c.total, 0) total
        from products a
        left join master_month b on true
        left join master_total_month c on a.id = c.product_id and b.month = c.month
      ),
      master_total_product as (
        select product_name, 
              max(case when month = '01' then total else 0 end) total_01,
              max(case when month = '02' then total else 0 end) total_02,
              max(case when month = '03' then total else 0 end) total_03,
              max(case when month = '04' then total else 0 end) total_04,
              max(case when month = '05' then total else 0 end) total_05,
              max(case when month = '06' then total else 0 end) total_06,
              max(case when month = '07' then total else 0 end) total_07,
              max(case when month = '08' then total else 0 end) total_08,
              max(case when month = '09' then total else 0 end) total_09,
              max(case when month = '10' then total else 0 end) total_10,
              max(case when month = '11' then total else 0 end) total_11,
              max(case when month = '12' then total else 0 end) total_12
        from master_group
        group by product_name
      ),
      master_output as (
        select product_name, concat(total_01, '|', total_02, '|', total_03, '|', total_04, '|', total_05, '|', total_06, '|', total_07, '|', total_08, '|', total_09, '|', total_10, '|', total_11, '|', total_12) total
        from master_total_product
        order by product_name
      )
      select *
      from master_output;
    `);

    return report.map((item, index) => {
      return {
        label: item.product_name,
        data: String(item.total)
          .split('|')
          .map((item) => Number(item)),
        borderColor: COLORS[index].backgroundColor || COLORS[0].backgroundColor,
        backgroundColor:
          COLORS[index].backgroundColor || COLORS[0].backgroundColor,
      };
    });
  } catch (err) {
    throw err;
  }
};

const getSalesReportPerCategoryQuery = async (filters: IFilterReport) => {
  try {
    const { year = '', storeId = '' } = filters;
    const report: any[] = await prisma.$queryRawUnsafe(`
      with master_month as (
        select '01' month union all
        select '02' month union all
        select '03' month union all
        select '04' month union all
        select '05' month union all
        select '06' month union all
        select '07' month union all
        select '08' month union all
        select '09' month union all
        select '10' month union all
        select '11' month union all
        select '12' month
      ), 
      master_total_month as (
        select date_format(a.order_date, '%m') as month, c.category_id, sum(b.quantity + b.bonus_quantity) as total 
        from orders a, order_items b, products c
        where a.id = b.order_id
        and b.product_id = c.id
        and a.store_id like '%${storeId}%'
        and date_format(a.order_date, '%Y') like '%${year}%'
        group by date_format(a.order_date, '%m'), c.category_id
      ),
      master_group as (
        select a.name category_name, b.month, coalesce(c.total, 0) total
        from categories a
        left join master_month b on true
        left join master_total_month c on a.id = c.category_id and b.month = c.month
      ),
      master_total_category as (
        select category_name, 
              max(case when month = '01' then total else 0 end) total_01,
              max(case when month = '02' then total else 0 end) total_02,
              max(case when month = '03' then total else 0 end) total_03,
              max(case when month = '04' then total else 0 end) total_04,
              max(case when month = '05' then total else 0 end) total_05,
              max(case when month = '06' then total else 0 end) total_06,
              max(case when month = '07' then total else 0 end) total_07,
              max(case when month = '08' then total else 0 end) total_08,
              max(case when month = '09' then total else 0 end) total_09,
              max(case when month = '10' then total else 0 end) total_10,
              max(case when month = '11' then total else 0 end) total_11,
              max(case when month = '12' then total else 0 end) total_12
        from master_group
        group by category_name
      ),
      master_output as (
        select category_name, concat(total_01, '|', total_02, '|', total_03, '|', total_04, '|', total_05, '|', total_06, '|', total_07, '|', total_08, '|', total_09, '|', total_10, '|', total_11, '|', total_12) total
        from master_total_category
        order by category_name
      )
      select *
      from master_output;
    `);

    return report.map((item, index) => {
      return {
        label: item.category_name,
        data: String(item.total)
          .split('|')
          .map((item) => Number(item)),
        backgroundColor:
          COLORS[index].backgroundColor || COLORS[0].backgroundColor,
      };
    });
  } catch (err) {
    throw err;
  }
};

export {
  getSalesReportPerMonthQuery,
  getSalesReportPerProductQuery,
  getSalesReportPerCategoryQuery,
};
