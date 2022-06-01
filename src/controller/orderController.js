import menuRepo from '../repository/menuRepo.js';
import orderRepo from '../repository/orderRepo.js';
import userRepo from '../repository/userRepo.js';
import validation from '../utils/validation.js';

const createOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = validation.validateOrder(data);
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }

    const menu = await menuRepo.getMenuById(data.id_menu);

    if (!menu) throw new Error(`Menu with menuId ${data.id_menu} not found!`);
    const totalBayar = menu.harga * data.quantity;
    const order = await orderRepo.addOrder({
      ...data,
      totalBayar,
      id_user: req.user.userId,
    });
    res.status(201).json({
      success: true,
      message: `success order menu ${menu.nama_makanan}`,
      data: order,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const { orderId } = req.params;

    const { error } = validation.validateOrder(data);
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }

    const order = await orderRepo.updateOrder(orderId, data);
    res.status(200).json({
      success: true,
      message: `success update orderId ${order._id}`,
      data: order,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    console.log('MASUK KE LIST ORDER');
    const order = await orderRepo.getListOrder();

    const listOrders = await Promise.all(
      order.map(async (item) => {
        const user = await userRepo.getUserByKey('_id', item.id_user);
        const menu = await menuRepo.getMenuById(item.id_menu);

        return {
          id_order: item._id,
          status: item.status,
          user: {
            id_user: item.id_user,
            nama: user.nama,
            email: user.email,
            no_hp: user.no_hp,
          },
          menu: {
            id_menu: item.id_menu,
            jenis: menu.jenis,
            nama_makanan: menu.nama_makanan,
            quantity: item.quantity,
          },
          totalBayar: item.totalBayar,
        };
      }),
    );

    res.status(200).json({
      success: true,
      message: `success`,
      data: listOrders,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

export default { createOrder, updateOrder, getAllOrder };
