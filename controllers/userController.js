import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { create, findOne, findById } from '../models/User';

export async function registerUser(req, res) {
  try {
    const { username, password, languages, stage } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await create({ username, password: hashedPassword, languages, stage });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await findOne({ username });
  if (user && (await compare(password, user.password))) {
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

export async function updateUserProgress(req, res) {
  const { userId, lessonId } = req.body;
  const user = await findById(userId);
  user.points += 10; // Example point increment per lesson
  await user.save();
  res.json({ message: 'Progress updated', points: user.points });
}
