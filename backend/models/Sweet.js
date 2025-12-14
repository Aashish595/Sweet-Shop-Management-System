import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Sweet = mongoose.model('Sweet', sweetSchema);
export default Sweet;
