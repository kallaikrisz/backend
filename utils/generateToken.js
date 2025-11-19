const jwt = require('jsonwebtoken');

const secret = 'nagyonTitkosKulcs'; // ugyanaz legyen, mint az auth middleware-ben

// Admin token
const adminToken = jwt.sign(
  { id: 1, role: 'admin' },
  secret,
  { expiresIn: '1h' }
);

// Regisztrált token
const registeredToken = jwt.sign(
  { id: 2, role: 'registered' },
  secret,
  { expiresIn: '1h' }
);

console.log('Admin token:', adminToken);
console.log('Registered token:', registeredToken);
