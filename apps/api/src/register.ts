// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === 'POST') {
//     try {
//       const { email, password } = req.body;
//       await prisma.user.create({
//         data: {
//           email,
//           password,
//           role: {
//             connect: {
//               name: 'customer',
//             },
//           },
//         },
//       });

//       res.status(200).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Failed to register user' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
