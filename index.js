const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');
const socketIO = require('socket.io');
const passport = require('./src/middleware/auth');

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@mongo:27017/';

const error404 = require('./src/middleware/404');
const advRouter = require('./src/routes/api/adv');
const usersRouter = require('./src/routes/api/users');


const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(__dirname + '/src/public'));
app.use(session({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/advertisements', advRouter);
app.use('/api', usersRouter);
app.use(error404);



async function start(HTTP_PORT, MONGO_URL) {
  try {
    await mongoose.connect(MONGO_URL);
    server.listen(HTTP_PORT, () => {
      console.log(`Delivery app ran at PORT ${HTTP_PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start(HTTP_PORT, MONGO_URL);

/*
app.listen(HTTP_PORT, () => {
  console.log(`Delivery app ran at port ${HTTP_PORT}`);
})*/