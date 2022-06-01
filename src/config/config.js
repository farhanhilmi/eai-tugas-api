import dotenv from 'dotenv';

dotenv.config();

const { HOST, PORT, TOKEN_EXPIRES_IN, SECRET_TOKEN, MONGODB_URI } = process.env;

const config = {
  app: {
    port: PORT | 8000,
  },
  db: {
    uri: MONGODB_URI,
  },
  SECRET_TOKEN,
  tokenExpiresIn: TOKEN_EXPIRES_IN,
};

export default config;
