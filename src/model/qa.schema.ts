import mongoose, { Schema, Document } from 'mongoose';

interface context extends Document {
  question: string;
  answer: string;
  translations: {
    [key: string]: {
      question: string;
      answer: string;
    };
  };
}

const quesans = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    type: Map,
    of: {
      question: { type: String },
      answer: { type: String }
    }
  }
}, { timestamps: true }
);

export default mongoose.model<context>('FAQ', quesans);
