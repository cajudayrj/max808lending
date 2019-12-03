require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
const contactUs = require('./server/routes/contact/contact');
const account = require('./server/routes/account/account');
const user = require('./server/routes/user/user')
const documents = require('./server/routes/documents/documents')

app.use('/contact-us', contactUs);
app.use('/account', account)
app.use('/user', user)
app.use('/documents', documents)


//public img folder
app.use('/uploads', express.static(path.join(__dirname, 'server/uploads')))

app.listen(1227, () => {
  console.log('Listening on port: 1227');
})