import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  // Reset tables (order matters because of FK constraints)
  await prisma.$queryRaw`
    TRUNCATE TABLE 
      order_items,
      orders,
      cart_items,
      carts,
      books,
      users
    RESTART IDENTITY CASCADE;
  `;

  // ------------------------
  // USERS
  // ------------------------
  const usersData = [
    { email: 'alice@email.com', password: 'password123' },
    { email: 'bob@email.com', password: 'password123' },
    { email: 'admin@email.com', password: 'password123', role: 'ADMIN' },
  ];

  const users = [];

  for (const u of usersData) {
    const hashedPassword = await bcrypt.hash(u.password, 10);

    const user = await prisma.user.create({
      data: {
        email: u.email,
        password: hashedPassword,
        role: u.role || 'USER',
        cart: {
          create: {}, // auto-create cart per user
        },
      },
      include: { cart: true },
    });

    users.push(user);
  }

  // ------------------------
  // BOOKS
  // ------------------------
  const books = await prisma.book.createMany({
    data: [
      {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        publisher: 'Scholastic',
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        publisher: 'Allen & Unwin',
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        genre: 'Programming',
        publisher: 'Prentice Hall',
      },
      {
        title: 'Gilgamesh Epic',
        author: '',
        genre: '',
        publisher: '',
      },
      
    ],
  });

  const allBooks = await prisma.book.findMany();

  // ------------------------
  // CART ITEMS (bob gets 2 items)
  // ------------------------
  const bob = users[1];

  await prisma.cartItem.createMany({
    data: [
      {
        cartId: bob.cart.id,
        bookId: allBooks[0].id,
        quantity: 1,
      },
      {
        cartId: bob.cart.id,
        bookId: allBooks[1].id,
        quantity: 2,
      },
    ],
  });

  // ------------------------
  // ORDERS (alice gets 2 orders) Bobgets 1
  // ------------------------
  const alice = users[0];

  const order1 = await prisma.order.create({
    data: {
      userId: alice.id,
      items: {
        create: [
          {
            bookId: allBooks[0].id,
            quantity: 1,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: alice.id,
      items: {
        create: [
          {
            bookId: allBooks[1].id,
            quantity: 2,
          },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      userId: bob.id,
      items: {
        create: [
          {
            bookId: allBooks[0].id,
            quantity: 2,
          },
        ],
      },
    },
  });

  

  console.log('Seed completed successfully!');
  console.log({ users: users.length, books: allBooks.length, orders: 2 });
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}