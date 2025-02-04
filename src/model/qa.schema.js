import mongoose from 'mongoose';

const quesansSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      type: Map,
      of: {
        question: { type: String },
        answer: { type: String }
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model('FAQ', quesansSchema);
