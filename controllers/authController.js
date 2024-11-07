import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User';

export async function register(req, res) {
   const { username, email, password } = req.body;
   const existingUser = await findOne({ email });
   if (existingUser) return res.status(400).json({ message: 'User already exists' });

   const hashedPassword = await hash(password, 10);
   const user = new User({ username, email, password: hashedPassword });
   await user.save();
   res.json({ message: 'User registered successfully' });
}

export async function login(req, res) {
   const { email, password } = req.body;
   const user = await findOne({ email });
   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

   const isMatch = await compare(password, user.password);
   if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

   const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   res.json({ token });
}

