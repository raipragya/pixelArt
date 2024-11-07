import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  languages: [{ type: String }], // e.g., ['Spanish', 'French']
  stage: { type: String, enum: ['Beginner', 'Intermediate'], default: 'Beginner' },
  points: { type: Number, default: 0 },
  rewards: [{ type: String }]
});

export default model('User', userSchema);
