import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    nama_makanan: {
      type: String,
      required: true,
    },
    jenis: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    gambar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'modifyDate' },
    collection: 'menu',
  },
);

export default mongoose.model('productModel', menuSchema);
