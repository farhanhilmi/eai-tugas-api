import Joi from 'joi';

const validateMenu = (data) => {
  const schema = Joi.object().keys({
    jenis: Joi.string().required(),
    nama_makanan: Joi.string().required(),
    harga: Joi.number().required(),
    deskripsi: Joi.string().required(),
    gambar: Joi.string().required(),
  });
  const options = {
    abortEarly: false,
  };
  return schema.validate(data, options);
};

const validateUserRegister = (data) => {
  const schema = Joi.object().keys({
    nama: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().valid('Pria', 'Wanita').required(),
    no_hp: Joi.string().required(),
  });
  const options = {
    abortEarly: false,
  };
  return schema.validate(data, options);
};

const validateOrder = (data) => {
  const schema = Joi.object().keys({
    id_menu: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  const options = {
    abortEarly: false,
  };
  return schema.validate(data, options);
};

export default { validateMenu, validateUserRegister, validateOrder };
