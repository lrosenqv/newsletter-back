import express from 'express';
import path from 'path';
import dotenv from "dotenv";

import __dirname  from './dirname.js';
import cookieParser  from 'cookie-parser';
import cors  from 'cors';
import logger  from 'morgan';

import usersRouter  from './routes/users.js';
import adminRouter from './routes/admin.js';
import addUserRouter from './routes/addUser.js';
import loginRouter from './routes/login.js';
import * as mongodb from 'mongodb';

dotenv.config()

const client = mongodb.MongoClient;
  client.connect('mongodb+srv://admin:Aylavi3w123@dw-newsletter.2vgd0ob.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true
  })
  .then(cli => {
    const db = cli.db('users');
    app.locals.db = db;
  })

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/addUser', addUserRouter);
app.use('/login', loginRouter);

app.use(function (req, res, next) {
  res.status(404).json({message: "We couldn't find what you were looking for 😞"})
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(err)
})

export default app;
