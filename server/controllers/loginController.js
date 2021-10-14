import User from '../models/user.js';

export const loginPostController = async (req, res) => {
  try {
    res.status(200).json({});
  } catch (err) {
    console.log(err);
  }
};