const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SALT_ROUNDS = 10;

const DUMMY_HASH = bcrypt.hashSync('mot-de-passe-factice', SALT_ROUNDS);

function signToken(user) {
  return jwt.sign({}, process.env.JWT_SECRET, {
    subject: user.id,
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
}

function publicUser(user) {
  return { id: user.id, email: user.email };
}

async function register(email, password) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await User.create({ email, passwordHash });
    return { user: publicUser(user), token: signToken(user) };
  } catch (err) {
    if (err.code === 11000) return { conflict: true };
    throw err;
  }
}

async function login(email, password) {
  const user = await User.findOne({ email });
  const ok = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !ok) return null;
  return { user: publicUser(user), token: signToken(user) };
}

async function logout(email, password) {
  return { message: 'Déconnexion réussie' };
}
module.exports = { register, login, logout };