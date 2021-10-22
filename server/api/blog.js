import express from 'express';
import {
  blogGetController,
  blogDeleteController,
  blogFindOneController
} from '../controllers/blogController.js';
import authenticate from '../utils/authenticate.js'

const blogAPI = express.Router();

blogAPI.get('/blog',  blogGetController);

blogAPI.get('/blog/:title', blogFindOneController);

blogAPI.delete('/blog', authenticate, blogDeleteController);

export default blogAPI;
