import express from 'express';
import { postPostController } from '../controllers/postController.js';
import authenticate from '../utils/authenticate.js';

const postAPI = express.Router();

postAPI.post('/post', authenticate, postPostController);

export default postAPI;
