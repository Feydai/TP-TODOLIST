const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const [scheme, token] = typeof header === 'string' ? header.split(' ') : [];

  if (scheme !== 'Bearer' || !token) {
    return res
      .status(401)
      .json({ error: { code: 'UNAUTHORIZED', message: 'Authentification requise' } });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    req.user = { id: payload.sub };
    return next();
  } catch {
    return res
      .status(401)
      .json({ error: { code: 'UNAUTHORIZED', message: 'Authentification requise' } });
  }
}

module.exports = requireAuth;