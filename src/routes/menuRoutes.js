import express from 'express';

import handler from '../controller/menuController.js';

import upload from '../utils/multer.js';

const router = () => {
  const router = express.Router();

  router.get('/', handler.getAllMenu);
  router.post('/', upload.single('gambar'), handler.postMenu);
  router.put('/:menuId', handler.updateMenu);
  router.delete('/:menuId', handler.deleteMenu);

  return router;
};

export default router;
