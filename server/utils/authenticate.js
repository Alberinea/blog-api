/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next = null) => {
  const { refresh_token } = req.cookies;
 
  if (!refresh_token) {
    return res.sendStatus(401);
  }

  jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) return res.sendStatus(403);
  });
  
  if (next) next();
};

export default authenticate;
