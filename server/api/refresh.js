import express from 'express';
import { refreshPostController } from '../controllers/refreshController.js';

const refreshAPI = express.Router();

refreshAPI.post('/refresh', refreshPostController);

export default refreshAPI;
