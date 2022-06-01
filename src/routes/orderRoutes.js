import express from 'express';

import handler from '../controller/orderController.js';

const router = () => {
  const router = express.Router();

  router.post('/', handler.createOrder);
  router.put('/:orderId', handler.updateOrder);
  router.get('/', handler.getAllOrder);

  return router;
};

export default router;
