import express from 'express';
import { blogGetController } from '../controllers/blogController.js';

const blogAPI = express.Router();

blogAPI.get('/blog',  blogGetController);

export default blogAPI;
