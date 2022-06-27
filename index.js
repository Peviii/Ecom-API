const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth.js');
const users = require('./routes/users.js');
const products = require('./routes/products.js');
const cart = require('./routes/cart.js');
const order = require('./routes/orders.js');
const PORT = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
	res.send("welcome to my storeShop");
});

//API ROUTE
app.use(express.json());
app.use('/auth', auth);
app.use('/users', users);
app.use('/products', products);
app.use('/cart', cart);
app.use('/order', order);
//DATABASE CONFIG
mongoose.connect(process.env.DATABASE).then(() => {
	app.listen(PORT,() => console.log(`${PORT} running. `));
}).catch((error) => console.log(error));
