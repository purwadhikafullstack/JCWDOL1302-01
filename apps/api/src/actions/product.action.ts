import { Product, ProductImage } from '@prisma/client';
import {
  createProductImageQuery,
  createProductQuery,
  deleteProductImageQuery,
  deleteProductQuery,
  getAvailableProductsByStoreIDQuery,
  getProductByIDQuery,
  getProductBySlugOrNameQuery,
  getProductsQuery,
  updateProductQuery,
} from '../queries/product.query';
import { HttpException } from '../exceptions/HttpException';
import {
  IFilterProduct,
  IProduct,
  IProductImage,
  IResultProduct,
} from '../interfaces/product.interface';

const getProductsAction = async (
  filters: IFilterProduct,
): Promise<IResultProduct> => {
  try {
    const products = await getProductsQuery(filters);
    return products;
  } catch (err) {
    throw err;
  }
};

const getAvailableProductsByStoreIDAction = async (
  filters: IFilterProduct,
): Promise<IResultProduct> => {
  try {
    const products = await getAvailableProductsByStoreIDQuery(filters);
    return products;
  } catch (err) {
    throw err;
  }
};
const getProductByIDAction = async (id: string): Promise<Product | null> => {
  try {
    const product = await getProductByIDQuery(id);

    if (!product) throw new HttpException(404, 'Data not found');

    return product;
  } catch (err) {
    throw err;
  }
};

const getProductBySlugAction = async (
  slug: string,
): Promise<Product | null> => {
  try {
    const product = await getProductBySlugOrNameQuery(slug, '');
    if (!product) throw new HttpException(404, 'Product not found');
    return product;
  } catch (err) {
    throw err;
  }
};

const createProductAction = async (productData: IProduct): Promise<Product> => {
  try {
    const existProduct = await getProductBySlugOrNameQuery(
      productData.slug,
      productData.name,
    );

    if (existProduct) throw new Error('Product already exists');

    const product = await createProductQuery(productData);
    return product;
  } catch (err) {
    throw err;
  }
};

const updateProductAction = async (
  id: string,
  productData: IProduct,
): Promise<Product> => {
  try {
    const product = await updateProductQuery(id, productData);
    return product;
  } catch (err) {
    throw err;
  }
};

const deleteProductAction = async (id: string): Promise<Product> => {
  try {
    const product = await deleteProductQuery(id);
    return product;
  } catch (err) {
    throw err;
  }
};

const createProductImageAction = async (
  data: IProductImage,
): Promise<ProductImage> => {
  try {
    if (!data.image) throw new Error('Please upload image file');

    const productImage = await createProductImageQuery(data);
    return productImage;
  } catch (err) {
    throw err;
  }
};

const deleteProductImageAction = async (id: string): Promise<ProductImage> => {
  try {
    const productImage = await deleteProductImageQuery(id);
    return productImage;
  } catch (err) {
    throw err;
  }
};

export {
  getProductsAction,
  getProductByIDAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  getProductBySlugAction,
  createProductImageAction,
  deleteProductImageAction,
  getAvailableProductsByStoreIDAction,
};
