import express from 'express';
import usersRoutes from '../users/index.js';
import racesRoutes from '../races/index.js';

const router = express.Router();

router.get('/', (_, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/users', usersRoutes);
router.use('/races', racesRoutes);

export default router;
