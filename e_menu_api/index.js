require('dotenv');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const connectToDB = require('./db/dbClient');

const customerRouter = require('./routes/customers');
const categoryRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const menuItemRouter = require('./routes/menuItem');
const managerRouter = require('./routes/managers');
const usersRouter = require('./routes/users');
const expoPushTokenRouter = require('./routes/expoPushToken');
const orderRouter = require('./routes/orders');
const shopRouter = require('./routes/shop')

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/customers', customerRouter);
app.use('/managers', managerRouter);
app.use('/categories', categoryRouter);
app.use('/menu-items', menuItemRouter);
app.use('/orders', orderRouter);
app.use('/expo-push-token', expoPushTokenRouter);
app.use('/shop', shopRouter);
app.use('/', (req, res) => {
  res.send('Server is running...');
});

connectToDB();

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
