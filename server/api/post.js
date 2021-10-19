import express from 'express';
import { postPostController } from '../controllers/postController.js';

const postAPI = express.Router();

postAPI.post('/post', postPostController);

export default postAPI;
