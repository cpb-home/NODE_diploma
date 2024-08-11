const express = require('express');
const path = require('path');

const HTTP_HOST = process.env.HTTP_HOST || '127.0.0.1';
const HTTP_PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@mongo:27017/';

const error404 = require('./src/middleware/404');
const advRouter = require('./src/routes/api/adv');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(__dirname + '/src/public'));

app.use('/api/advertisements', advRouter);
app.use(error404);



app.listen(HTTP_PORT, HTTP_HOST, () => {
  console.log(`Delivery app ran at ${HTTP_PORT}:${HTTP_PORT}`);
})