import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('base64');

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('base64')}`);
    });
  });
};

const verifyPassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('base64'));
    });
  });
};

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, config.SECRET_TOKEN, {
    expiresIn: config.tokenExpiresIn,
  });
};

export { hashPassword, verifyPassword, generateAccessToken };
