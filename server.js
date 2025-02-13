const express = require('express');
const cors = require('cors');
const connectDB = require('./user-management/config/db.js');
const authRouter = require('./user-management/routes/auth.js');
const categoriesRouter = require('./user-management/routes/categories.js');
const ordersRouter = require('./user-management/routes/orders.js');
const productsRouter = require('./user-management/routes/products.js');
const reviewsRouter = require('./user-management/routes/reviews.js');
const usersRouter = require('./user-management/routes/users.js');

require('dotenv').config();

const server = express();

connectDB().catch((err) => {
    console.error('Error: Connection could not be established:', err);
    process.exit(1);
});

server.use(express.json());
server.use(cors({ origin: process.env.CLIENT_URL || 'http://127.0.0.1:3005' }));

server.use('/auth', authRouter)

server.use('/categories', categoriesRouter);
server.use('/orders', ordersRouter);
server.use('/products', productsRouter);
server.use('/reviews', reviewsRouter);
server.use('/users', usersRouter);

const port = process.env.PORT || 3005;

server.listen(port, () => {
    console.log(`Server started successfully on port: ${port}`);
});
