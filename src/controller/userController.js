import userRepo from '../repository/userRepo.js';
import validation from '../utils/validation.js';
import {
  hashPassword,
  verifyPassword,
  generateAccessToken,
} from '../utils/jwt.js';

const createAccount = async (req, res, next) => {
  try {
    const data = req.body;

    const { error } = validation.validateUserRegister(data);
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepo.createUser({
      ...data,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ success: true, message: 'success create account', data: user });
  } catch (err) {
    console.log('ERROR', err);
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const userLogin = async (req, res, next) => {
  try {
    const data = req.body;

    if (!(data.email && data.password))
      throw new Error('All input is required!');

    const user = await userRepo.getUserByKey('email', data.email);

    if (!user) {
      throw new Error(`email ${data.email} is not registered yet!`);
    }
    if (!(await verifyPassword(data.password, user.password))) {
      throw new Error('Password incorrect!');
    }

    const accessToken = generateAccessToken(user._id.toString());

    res
      .status(200)
      .json({ success: true, message: 'success login', accessToken });
  } catch (err) {
    console.log('ERROR', err);
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

export default { createAccount, userLogin };
