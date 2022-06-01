/* eslint-disable import/extensions */
import express from 'express';

import menuRoutes from './menuRoutes.js';
import userRoutes from './userRoutes.js';
import orderRoutes from './orderRoutes.js';

import authenticateToken from '../middleware/auth.js';

const Routes = () => {
  const router = express.Router();
  router.use('/menu', menuRoutes());
  router.use('/user', userRoutes());
  router.use('/order', authenticateToken, orderRoutes());
  return router;
};

export default Routes;
