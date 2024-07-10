import { IFilterStock, IResultStock, IStock, IUpdateStock } from '@/interfaces/stock.interface';
import { Stock, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createStockQuery = async (stockData: IStock): Promise<Stock> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const stock = await prisma.stock.create({
          data: {
            baseStock: stockData.stock,
            remainingStock: stockData.stock,
            storeId: stockData.storeId,
            productId: stockData.productId,
          },
        });

        await prisma.stockHistory.create({
          data: {
            stockProduct: {
              connect: {
                id: stock.id,
              },
            },
            type: stockData.type,
            stock: stockData.stock,
          },
        });

        return stock;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateStockQuery = async (
  id: string,
  stockData: IUpdateStock,
): Promise<Stock> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const stock = await prisma.stock.findUnique({
          where: {
            id,
          },
        });

        if (!stock) throw new Error('Stock not found');

        let data: any = {};

        if (stockData.type === 'kurang') {
          data.usedStock = stock.usedStock + stockData.stock;
          data.remainingStock = stock.remainingStock - stockData.stock;
        } else {
          data.baseStock = stock.baseStock + stockData.stock;
          data.remainingStock = stock.remainingStock + stockData.stock;
        }

        const updatedStock = await prisma.stock.update({
          data: {
            ...data
          },
          where: {
            id,
          },
        });

        await prisma.stockHistory.create({
          data: {
            stockProduct: {
              connect: {
                id: stock.id,
              },
            },
            type: stockData.type,
            stock: stockData.stock,
          },
        });

        return updatedStock;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const getStocksQuery = async (filters: IFilterStock): Promise<IResultStock> => {
  try {
    const {
      storeId = '',
      productId = '',
      keyword = '',
      page = 1,
      size = 1000,
    } = filters;

    const conditions: any = {
      store: {
        name: {
          contains: keyword,
        }
      }
    };

    if (storeId) conditions.storeId = storeId;
    if (productId) conditions.productId = productId;

    const stocks = await prisma.stock.findMany({
      include: {
        store: true,
      },
      where: {
        ...conditions
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.stock.aggregate({
      _count: {
        id: true,
      },
      where: {
        ...conditions,
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { stocks, pages };
  } catch (err) {
    throw err;
  }
};

const getStocksByProductIDQuery = async (
  productId: string,
): Promise<Stock[] | null> => {
  try {
    const stocks = await prisma.stock.findMany({
      include: {
        store: true,
      },
      where: {
        productId,
      },
    });

    return stocks;
  } catch (err) {
    throw err;
  }
};

const getStockByIDQuery = async (id: string): Promise<Stock | null> => {
  try {
    const stock = await prisma.stock.findUnique({
      include: {
        store: true,
      },
      where: {
        id,
      },
    });

    return stock;
  } catch (err) {
    throw err;
  }
};

const getStockByProductIdAndStoreIdQuery = async (productId: string, storeId: string): Promise<Stock | null> => {
  try {
    const stock = await prisma.stock.findFirst({
      where: {
        productId,
        storeId,
      },
    });

    return stock;
  } catch (err) {
    throw err;
  }
};

export {
  createStockQuery,
  updateStockQuery,
  getStocksQuery,
  getStocksByProductIDQuery,
  getStockByIDQuery,
  getStockByProductIdAndStoreIdQuery,
};
