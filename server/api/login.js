import express from 'express';
import { loginPostController } from '../controllers/loginController.js';

const loginAPI = express.Router();

loginAPI.post('/login', loginPostController);

export default loginAPI;
