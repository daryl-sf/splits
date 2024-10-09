import express from 'express';
import User from '../../models/user.js';
import authMiddleware from '../../middleware/auth.js';
import { check } from 'express-validator';
import validationMiddleware from '../../middleware/validation.js';

const router = express.Router();

// /api/users/me routes
router.get('/me', authMiddleware, (req, res) => {
  res.json(req.session.user);
});

router.put(
  '/me',
  authMiddleware,
  // check('username').isLength({ min: 3, max: 75 }).withMessage('Username must be less than 75 characters long.'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  // check('email').isEmail().withMessage('Email must be a valid email address').normalizeEmail(),
  validationMiddleware,
  async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findById(req.session.user._id);
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;
      const updatedUser = await user.save();
      req.session.user = updatedUser.toJSON();
      res.json(updatedUser.toJSON());
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  '/signup',
  check('username').isLength({ min: 3, max: 75 }).withMessage('Username must be less than 75 characters long.'),
  check('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  check('email').isEmail().withMessage('Email must be a valid email address').normalizeEmail(),
  validationMiddleware,
  async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ message: 'User already exists' });
      const user = new User({ username, password, email });
      const savedUser = await user.save();
      req.session.user = savedUser.toJSON();
      res.status(201).json(savedUser.toJSON());
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  '/login', 
  check('email').isEmail().withMessage('Email must be a valid email address').normalizeEmail(),
  check('password').notEmpty().withMessage('Password is required'),
  validationMiddleware,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) return res.status(401).json({ message: 'Invalid log in details' });

      const isValid = await user.comparePassword(password);

      if (!isValid) return res.status(401).json({ message: 'Invalid log in details' });

      req.session.user = user.toJSON();
      res.json(user.toJSON());
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }

    res.end();
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    // Clear the cookie on the client side
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
