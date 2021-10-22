import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import blogAPI from './api/blog.js';
import loginAPI from './api/login.js';
import refreshAPI from './api/refresh.js';
import logoutAPI from './api/logout.js';
import postAPI from './api/post.js';
import commentAPI from './api/comment.js';

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

const client = 
  process.env.CLIENT || 'https://alberinea.github.io/blog-api'; 

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

app.use(
  cors({
    origin: client,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(logger('dev'));

app.use('/api', blogAPI, loginAPI, refreshAPI, logoutAPI, postAPI, commentAPI);

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, console.log(`listening on port ${port}`));
