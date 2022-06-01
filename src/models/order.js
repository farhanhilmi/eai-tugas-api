import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    id_menu: {
      type: Schema.Types.ObjectId,
      ref: 'menu',
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    quantity: {
      type: Number,
      required: true,
    },
    catatan: {
      type: String,
      default: '',
    },
    totalBayar: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'tanggal_order', updatedAt: 'modifyDate' },
    collection: 'orders',
  },
);

export default mongoose.model('Orders', orderSchema);
