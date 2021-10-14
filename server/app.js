import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import blogAPI from './api/v1/blog.js';
import loginAPI from './api/v1/login.js';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}/${process.env.DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log('connected to the database'))
  .catch((err) => {
    console.log(err);
  });

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('api', blogAPI, loginAPI);

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, console.log(`listening on port ${port}`));
