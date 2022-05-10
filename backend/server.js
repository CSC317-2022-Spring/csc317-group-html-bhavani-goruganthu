const express = require('express');
const cors = require('cors');
const auth = require('./endpoints/auth'); // Auth API
const searchProducts = require('./endpoints/searchProducts'); // Used for search APIs
const products = require('./endpoints/products'); // Used for product APIs
const users = require('./endpoints/users'); // User APIs
const orders = require('./endpoints/orders'); // Order APIs
let cookieParser = require('cookie-parser'); // for persistent login

const app = express();

app.use(cors({ origin: true, credentials: true })); // using credentials to store & get cookies
// app.use(cors());
app.use(cookieParser());
app.use(express.json());

// routes
app.use('/userAuth', auth); // setUser, getUser, logout - using cookies
app.use('/api/search', searchProducts); // searchGetAllProducts, searchByCategory, searchByKeyword, searchByCategoryNKeyword
app.use('/api/products', products); //getAllCategories, getProductByID,
app.use('/api/users', users); // insertUser, verifyUserLogin, fetchUserDetails, updateSysPrefInfo
app.use('/api/orders', orders); // getOrdersByUserEmail, addNewOrder
app.listen(process.env.PORT, () =>
  console.log(`Backend server on port ${process.env.PORT}!`)
);
