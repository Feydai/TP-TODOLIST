const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCredentials(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Corps de requête invalide' };
  }

  const { email, password } = body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Email et mot de passe doivent être des chaînes' };
  }

  const cleanEmail = email.trim().toLowerCase();
  if (!EMAIL_RE.test(cleanEmail)) return { error: 'Email invalide' };
  if (password.length < 8) return { error: 'Mot de passe : 8 caractères minimum' };
  if (Buffer.byteLength(password, 'utf8') > 72) {
    return { error: 'Mot de passe trop long (72 octets maximum)' };
  }

  return { email: cleanEmail, password };
}

module.exports = { validateCredentials };