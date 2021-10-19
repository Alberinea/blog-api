import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const refreshPostController = async (req, res) => {
  try {
    let { refresh_token } = req.cookies;

    if (!refresh_token) {
      return res.sendStatus(401);
    }

    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.sendStatus(403);

        const access_token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '15m',
          }
        );

        refresh_token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '1w',
          }
        );

        try {
          await User.findOneAndUpdate(
            { username: user.username },
            { refresh_token }
          );
        } catch (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
          overwrite: true,
        });

        res.status(200).json({ access_token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json('Bad Request');
  }
};
