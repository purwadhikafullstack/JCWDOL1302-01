import { PrismaClient } from '@prisma/client';
import roles from './data/roles.json';
import users from './data/users.json';
import categories from './data/categories.json';
import products from './data/products.json';
import stores from './data/stores.json';
import { genSalt, hash, compare } from 'bcrypt';

const prisma = new PrismaClient();
const ADMIN_EMAIL: string = 'admin@gmail.com';

const seedRoles = async () => {
  console.log('--- Start seeding roles data ---');

  await prisma.role.deleteMany();
  for (const role of roles) {
    await prisma.role.create({
      data: {
        name: role.name,
      },
    });

    console.log('Created role', role.name);
  }

  console.log('Seeding roles data finished');
};

const seedUsers = async () => {
  console.log('--- Start seeding users data ---');

  await prisma.user.deleteMany();
  for (const user of users) {
    const salt = await genSalt(10);
    const hashPassword = await hash(user.password, salt);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
        isVerified: true,
        role: {
          connect: {
            name: 'super_admin',
          },
        },
      },
    });

    console.log('Created user', user.name);
  }

  console.log('Seeding users data finished');
};

const seedCategories = async () => {
  console.log('--- Start seeding categories data ---');

  await prisma.stockHistory.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name as string,
        slug: category.slug,
        image: category.image,
      },
    });

    console.log('Created category', category.name);
  }

  console.log('Seeding categories data finished');
};

const seedProducts = async () => {
  console.log('--- Start seeding products data ---');

  // await prisma.product.deleteMany();
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        productImages: {
          createMany: {
            data: product.images.map((image) => {
              return {
                image,
              };
            }),
          },
        },
        createdByUser: {
          connect: {
            email: ADMIN_EMAIL,
          },
        },
        category: {
          connect: {
            slug: product.categorySlug,
          },
        },
      },
    });

    console.log('Created product', product.name);
  }

  console.log('Seeding products data finished');
};

const seedStores = async () => {
  console.log('--- Start seeding store data ---');

  await prisma.store.deleteMany();
  for (const store of stores) {
    await prisma.store.create({
      data: {
        name: store.name as string,
        address: store.address,
        subdistrictId: store.subdistrictId,
        subdistrictName: store.subdistrictName,
        cityId: store.cityId,
        cityName: store.cityName,
        provinceId: store.provinceId,
        provinceName: store.provinceName,
        longitude: store.longitude,
        latitude: store.latitude,
      },
    });

    console.log('Created store', store.name);
  }

  console.log('Seeding stores data finished');
};

const main = async () => {
  await seedRoles();
  await seedUsers();
  await seedCategories();
  await seedProducts();
  await seedStores();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
