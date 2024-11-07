import { Schema, model } from 'mongoose';

const lessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Base content in English
  difficulty: { type: String, enum: ['Beginner', 'Intermediate'], default: 'Beginner' },
  points: { type: Number, default: 10 } // Points awarded upon completion
});

export default model('Lesson', lessonSchema);
