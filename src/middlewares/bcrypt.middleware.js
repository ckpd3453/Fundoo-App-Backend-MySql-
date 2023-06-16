const bcrypt = require('bcrypt');

export const securePassword = async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};

export const match = async (password, hash) => {
  const check = await bcrypt.compare(password, hash);
  return check;
};
