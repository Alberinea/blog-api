/* eslint-disable camelcase */
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const logoutDeleteController = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;
    if (!refresh_token) return res.sendStatus(401);

    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.sendStatus(403);

        try {
          await User.findByIdAndUpdate(
            user._id,
            { refresh_token: '' }
          );
        } catch (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: 'Server Error' });
        }

        res.cookie('refresh_token', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 0,
        });

        res.sendStatus(204);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad Request');
  }
};
