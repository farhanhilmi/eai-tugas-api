import mongoose from 'mongoose';

const genderOptions = {
  values: ['Pria', 'Wanita'],
};

const userSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: 'Name is required!',
    },
    email: {
      type: String,
      required: 'Email is required!',
      unique: true,
    },
    password: {
      type: String,
      required: 'Password is required!',
    },
    gender: {
      type: String,
      enum: genderOptions,
      required: 'Gender is required!',
    },
    no_hp: {
      type: String,
      required: 'no_hp is required!',
    },
  },
  {
    timestamps: { createdAt: 'createdDate: ', updatedAt: 'modifyDate: ' },
    collection: 'users',
  },
);

export default mongoose.model('userModel', userSchema);
