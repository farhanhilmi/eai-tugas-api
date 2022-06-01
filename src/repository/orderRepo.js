import Menu from '../models/menu.js';
import Order from '../models/order.js';

import utils from '../Utils/mongodb.js';

const addOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.create(data);
      resolve(order);
    } catch (err) {
      reject(err);
    }
  });
};

const getOrderById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById(id);
      resolve(order);
    } catch (err) {
      reject(err);
    }
  });
};

const getListOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order.find();
      resolve(orders);
    } catch (err) {
      reject(err);
    }
  });
};

const updateOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderId = utils.toObjectId(id);
      const isExist = await Order.exists({ _id: orderId });
      if (!isExist) throw new Error('Order Not Found!');
      const order = await Order.findByIdAndUpdate(orderId, data, { new: true });
      resolve(order);
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  addOrder,
  updateOrder,
  getOrderById,
  getListOrder,
};
