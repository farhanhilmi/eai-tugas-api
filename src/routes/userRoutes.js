import express from 'express';

import handler from '../controller/userController.js';

const router = () => {
  const router = express.Router();

  router.post('/', handler.createAccount);
  router.post('/login', handler.userLogin);

  return router;
};

export default router;
