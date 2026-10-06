const authService = require('../services/auth');
const { validateCredentials } = require('../validators/auth');

async function register(req, res) {
  try {
    const v = validateCredentials(req.body);
    if (v.error) {
      return res.status(400).json({ error: { code: 'INVALID_INPUT', message: v.error } });
    }

    const result = await authService.register(v.email, v.password);
    if (result.conflict) {
      return res
        .status(409)
        .json({ error: { code: 'EMAIL_ALREADY_USED', message: 'Cet email est déjà utilisé' } });
    }

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' } });
  }
}

async function login(req, res) {
  try {
    const v = validateCredentials(req.body);
    if (v.error) {
      return res.status(400).json({ error: { code: 'INVALID_INPUT', message: v.error } });
    }

    const result = await authService.login(v.email, v.password);
    if (!result) {
      return res
        .status(401)
        .json({ error: { code: 'UNAUTHORIZED', message: 'Email ou mot de passe incorrect' } });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' } });
  }
}

async function logout(req, res) {
  return res.status(200).json({ message: 'Déconnexion réussie' });
}

module.exports = { register, login, logout };