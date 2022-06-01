import userModel from '../models/user.js';

export const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await userModel.exists({ email: data.email });
      if (isExist) throw new Error('Email already exist');
      const user = await userModel.create(data);
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

export const getUserByKey = (key, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await userModel.exists({ [key]: value });
      if (!isExist) throw new Error('User Not Found!');
      const user = await userModel.findOne({ [key]: value });
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

export default { createUser, getUserByKey };
