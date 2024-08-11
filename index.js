const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3000;
const DB_PORT = process.env.DB_PORT || 'mongodb://root:example@mongo:27017/';

const error404 = require('./src/middleware/404');
const advRouter = require('./src/routes/api/adv');


const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(__dirname + '/src/public'));

app.use('/api/advertisements', advRouter);
app.use(error404);



app.listen(PORT, () => {
  console.log(`Delivery app ran at port ${PORT}`);
})