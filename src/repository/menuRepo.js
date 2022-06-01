import Menu from '../models/menu.js';
import utils from '../Utils/mongodb.js';

const getListMenu = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const menus = await Menu.find();
      resolve(menus);
    } catch (err) {
      reject(err);
    }
  });
};

const getMenuById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const menu = await Menu.findById(id);
      resolve(menu);
    } catch (err) {
      reject(err);
    }
  });
};

const addMenu = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const menu = await Menu.create(data);
      resolve(menu);
    } catch (err) {
      reject(err);
    }
  });
};

const updateMenu = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const menuId = utils.toObjectId(id);
      const isExist = await Menu.exists({ _id: menuId });
      if (!isExist) throw new Error('Menu Not Found!');
      const menu = await Menu.findByIdAndUpdate(menuId, data, { new: true });
      resolve(menu);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteMenu = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const menuId = utils.toObjectId(id);
      const isExist = await Menu.exists({ _id: menuId });
      if (!isExist) throw new Error('Menu Not Found!');
      const menu = await Menu.findByIdAndDelete(menuId);
      resolve(menu);
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  getListMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuById,
};
