import menuRepo from '../repository/menuRepo.js';
import validation from '../utils/validation.js';

const postMenu = async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = validation.validateMenu({
      ...data,
      gambar: req.file.filename,
    });
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }

    const menu = await menuRepo.addMenu({
      ...data,
      gambar: req.file.filename,
    });
    res
      .status(201)
      .json({ success: true, message: 'success add menu', data: menu });
  } catch (err) {
    console.log('ERROR', err);
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const data = req.body;
    const { menuId } = req.params;

    const { error } = validation.validateMenu(data);
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }

    const menu = await menuRepo.updateMenu(menuId, data);
    res
      .status(200)
      .json({ success: true, message: 'success update menu', data: menu });
  } catch (err) {
    console.log('ERROR', err);
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const getAllMenu = async (req, res, next) => {
  try {
    const menu = await menuRepo.getListMenu();
    res
      .status(200)
      .json({ success: true, message: 'success fetch menu', data: menu });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ success: false, message: 'failed', data: [] });
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const menu = await menuRepo.deleteMenu(menuId);
    res.status(200).json({
      success: true,
      message: `success delete menu ${menu.nama_makanan}`,
      data: menu,
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ success: false, message: 'failed', data: [] });
  }
};

export default { postMenu, updateMenu, getAllMenu, deleteMenu };
