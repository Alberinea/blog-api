import express from 'express';
import { loginGetController } from '../controllers/loginController.js';

const loginAPI = express.Router();

loginAPI.get('/login', loginGetController);

export default loginAPI;
