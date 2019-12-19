require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "auth_token");
  next();
})

// routes
const contactUs = require('./server/routes/contact/contact');
const account = require('./server/routes/account/account');
const user = require('./server/routes/user/user');
const documents = require('./server/routes/documents/documents');
const loans = require('./server/routes/loans/loans');
const admin = require('./server/routes/admin/admin');

app.use('/contact-us', contactUs);
app.use('/account', account);
app.use('/user', user);
app.use('/documents', documents);
app.use('/loans', loans);
app.use('/admin', admin);


//public img folder
app.use('/uploads', express.static(path.join(__dirname, 'server/uploads')));

app.listen(1227, () => {
  console.log('Listening on port: 1227');
})