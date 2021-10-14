import express from 'express';
import { indexGetController } from '../controllers/indexController.js';

const indexAPI = express.Router();

indexAPI.get('/', indexGetController);

export default indexAPI;

