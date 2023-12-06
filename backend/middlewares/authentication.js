import jwt from 'jsonwebtoken';

import { jwtSecret } from '../config.js';

// use this middleware for API that requires user exists.
export const authenticate = (req, res, next) => {
  // Get the JWT from the request cookies
  const token = req.cookies.token;

  if (token) {
    try {
      // Verify and decode the JWT
      const decoded = jwt.verify(token, jwtSecret);

      // Check if the token has expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTimestamp) {
        // Token has expired, remove it from the cookie
        res.clearCookie('token');
        // You can also handle the expired token case in a different way (e.g., redirect to login, send an error response)
        return res.status(401).json({ error: 'Token expired' });
      }

      // Attach the 'id' to the request object for further use in the route handlers
      req.userId = decoded.id;

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      // JWT verification failed
      // Handle the error accordingly (e.g., redirect to login, send an error response)
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    // No JWT found in the cookie
    // Handle the case accordingly (e.g., redirect to login, send an error response)
    res.status(401).json({ error: 'Token not provided' });
  }
};