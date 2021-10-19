import express from 'express';
import { logoutDeleteController } from '../controllers/logoutController.js';

const logoutAPI = express.Router();

logoutAPI.delete('/logout', logoutDeleteController);

export default logoutAPI;
