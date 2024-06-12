import bcrypt from 'bcryptjs';
import { users } from '../../data/users';
import session from 'express-session';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
