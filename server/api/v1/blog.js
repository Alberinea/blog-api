import express from 'express';
import { blogGetController } from '../../controllers/blogController.js';

const blogAPI = express.Router();

blogAPI.get('/v1/blog', blogGetController);

export default blogAPI;

