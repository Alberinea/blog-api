import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginPostController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Username Incorrect' });
    }

    bcrypt.compare(password.toString(), user.password, async (err, isMatch) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'Bad Request' });
      }

      if (isMatch) {
        const access_token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '15m',
          }
        );
        const refresh_token = jwt.sign(
          { username: user.username, role: user.role },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '1w',
          }
        );

        try {
          await User.findByIdAndUpdate(user._id, { refresh_token });
        } catch (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: 'Server Error' });
        }

        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
        });
        res.status(200).json({ success: true, access_token });
      } else {
        res.status(401).json({ success: false, message: 'Password Incorrect' });
      }
    });
  } catch (err) {
    console.log(err);
  } 
};
