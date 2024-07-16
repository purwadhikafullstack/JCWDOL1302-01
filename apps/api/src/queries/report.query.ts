import { PrismaClient, StockHistory } from '@prisma/client';
import { IFilterReport, IFilterReportTable } from '@/interfaces/report.interface';
import { COLORS } from '@/constants/color.constant';
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";

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
          and upper(order_status) = upper('Pesanan Dikonfirmasi')
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
          and upper(a.order_status) = upper('Pesanan Dikonfirmasi')
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
        borderColor: index > 19 ? COLORS[0].backgroundColor : COLORS[index].backgroundColor || COLORS[0].backgroundColor,
        backgroundColor: index > 19 ? COLORS[0].backgroundColor : COLORS[index].backgroundColor || COLORS[0].backgroundColor,
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
        and upper(a.order_status) = upper('Pesanan Dikonfirmasi')
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
        index > 19 ? COLORS[0].backgroundColor : COLORS[index].backgroundColor || COLORS[0].backgroundColor,
      };
    });
  } catch (err) {
    throw err;
  }
};

const getSalesReportTotalProductQuery = async (filters: IFilterReport) => {
  try {
    const { year = '', storeId = '' } = filters;
    const report: any[] = await prisma.$queryRawUnsafe(`
      with master_total as (
          select b.product_id, sum(b.quantity + b.bonus_quantity) as total 
          from orders a, order_items b
          where a.id = b.order_id
          and a.store_id like '%${storeId}%'
          and date_format(a.order_date, '%Y') like '%${year}%'
          and upper(a.order_status) = upper('Pesanan Dikonfirmasi')
          group by b.product_id
      ),
      master_output as (
        select a.name product_name, coalesce(b.total, 0) total
        from products a
        left join master_total b on a.id = b.product_id
				order by a.name
      )
      select *
      from master_output;
    `);

    return [
      {
        label: 'Penjualan',
        data: report.map((item) => Number(item?.total)),
        backgroundColor: report.map((item, index) => index > 19 ? COLORS[0].backgroundColor : COLORS[index].backgroundColor || COLORS[0].backgroundColor),
        borderColor: report.map((item, index) => index > 19 ? COLORS[0].borderColor : COLORS[index].borderColor || COLORS[0].borderColor),
        borderWidth: 1,
      },
    ];
  } catch (err) {
    throw err;
  }
};

const getSalesReportTotalCategoryQuery = async (filters: IFilterReport) => {
  try {
    const { year = '', storeId = '' } = filters;
    const report: any[] = await prisma.$queryRawUnsafe(`
      with master_total as (
        select c.category_id, sum(b.quantity + b.bonus_quantity) as total 
        from orders a, order_items b, products c
        where a.id = b.order_id
        and b.product_id = c.id
        and a.store_id like '%${storeId}%'
        and date_format(a.order_date, '%Y') like '%${year}%'
        and upper(a.order_status) = upper('Pesanan Dikonfirmasi')
        group by c.category_id
      ),
      master_output as (
        select a.name category_name, coalesce(b.total, 0) total
        from categories a
        left join master_total b on a.id = b.category_id
				order by a.name
      )
      select *
      from master_output;
    `);

    return [
      {
        label: 'Penjualan',
        data: report.map((item) => Number(item?.total)),
        backgroundColor: report.map((item, index) => index > 19 ? COLORS[0].backgroundColor : COLORS[index].backgroundColor || COLORS[0].backgroundColor),
        borderColor: report.map((item, index) => index > 19 ? COLORS[0].borderColor : COLORS[index].borderColor || COLORS[0].borderColor),
        borderWidth: 1,
      },
    ];
  } catch (err) {
    throw err;
  }
};

const getStockReportPerMonthQuery = async (filters: IFilterReport) => {
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
      master_type as (
        select 'Total Penambahan' type union all 
        select 'Total Pengurangan' type
      ),
      master_total as (
        select date_format(a.created_date, '%m') as month, (case when a.type = 'tambah' then 'Total Penambahan' else 'Total Pengurangan' end) type, sum(a.stock) as total
        from stock_histories a, stocks b
        where a.stock_id = b.id
        and b.store_id like '%${storeId}%'
        and date_format(a.created_date, '%Y') like '%${year}%'
        group by month, a.type
        order by month, a.type desc
      ),
      master_group as (
        select a.month, b.type, coalesce(c.total, 0) total
        from master_month a
        left join master_type b on true 
        left join master_total c on a.month = c.month and b.type = c.type
      ),
      master_total_type as (
        select type, 
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
        group by type
        order by type
      ),
      master_total_akhir as (
        select 'Stok Akhir' type, 
              (a.total_01 - b.total_01) total_01,
              (a.total_02 - b.total_02) total_02,
              (a.total_03 - b.total_03) total_03,
              (a.total_04 - b.total_04) total_04,
              (a.total_05 - b.total_05) total_05,
              (a.total_06 - b.total_06) total_06,
              (a.total_07 - b.total_07) total_07,
              (a.total_08 - b.total_08) total_08,
              (a.total_09 - b.total_09) total_09,
              (a.total_10 - b.total_10) total_10,
              (a.total_11 - b.total_11) total_11,
              (a.total_12 - b.total_12) total_12
        from master_total_type a, master_total_type b 
        where a.type = 'Total Penambahan'
        and b.type = 'Total Pengurangan'
      ),
      master_total_all as (
        select *
        from master_total_type
        union all 
        select *
        from master_total_akhir
      ),
      master_output as (
        select type, concat(total_01, '|', total_02, '|', total_03, '|', total_04, '|', total_05, '|', total_06, '|', total_07, '|', total_08, '|', total_09, '|', total_10, '|', total_11, '|', total_12) total
        from master_total_all
      )
      select *
      from master_output;
    `);

    return report.map((item, index) => {
      return {
        label: item.type,
        data: String(item.total)
          .split('|')
          .map((item) => Number(item)),
        borderColor: index > 19 ? COLORS[0].backgroundColor : COLORS[index].backgroundColor || COLORS[0].backgroundColor,
        backgroundColor: index > 19 ? COLORS[0].backgroundColor : COLORS[index].backgroundColor || COLORS[0].backgroundColor,
      };
    });
  } catch (err) {
    throw err;
  }
};

const getStockReportDetailQuery = async (filters: IFilterReportTable) => {
  try {
    const {
      year = '',
      month = '',
      storeId = '',
      keyword = '',
      page = 1,
      size = 1000,
    } = filters;

    let conditions: any = {};

    if (storeId) {
      conditions = {
        ...conditions,
        stockProduct: {
          storeId,
        },
      }
    }

    if (keyword) {
      conditions = {
        ...conditions,
        product: {
          name: {
            contains: keyword,
          }
        },
      }
    }

    if (year) {
      if (month) {
        const startOfMonthDate = startOfMonth(new Date(Number(year), Number(month) - 1, 1));
        const endOfMonthDate = endOfMonth(new Date(Number(year), Number(month) - 1, 1));

        conditions = {
          ...conditions,
          createdDate: {
            gte: startOfMonthDate,
            lt: endOfMonthDate,
          }
        }
      } else {
        const startOfYearDate = startOfYear(new Date(Number(year), 0, 1));
        const endOfYearDate = endOfYear(new Date(Number(year), 11, 31));
        
        conditions = {
          ...conditions,
          createdDate: {
            gte: startOfYearDate,
            lt: endOfYearDate,
          }
        }
      }
    }

    const reports = await prisma.stockHistory.findMany({
      include: {
        stockProduct: {
          select: {
            store: true,
            product: true,
          }
        },
        createdByUser: true,
      },
      where: {
        ...conditions,
      },
      orderBy: {
        createdDate: 'desc'
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.stockHistory.aggregate({
      _count: {
        id: true,
      },
      where: {
        ...conditions,
      },
      orderBy: {
        createdDate: 'desc'
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { reports, pages };
  } catch (err) {
    throw err;
  }
};

export {
  getSalesReportPerMonthQuery,
  getSalesReportPerProductQuery,
  getSalesReportPerCategoryQuery,
  getSalesReportTotalProductQuery,
  getSalesReportTotalCategoryQuery,
  getStockReportPerMonthQuery,
  getStockReportDetailQuery,
};
