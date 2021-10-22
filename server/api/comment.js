import express from 'express';
import { commentGetController, commentPostController } from '../controllers/commentController.js';

const commentAPI = express.Router();

commentAPI.get('/comment/:blogID', commentGetController)

commentAPI.post('/comment', commentPostController);

export default commentAPI;
