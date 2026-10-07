const { Router } = require('express');
const healthRoutes = require('./health.routes');
const taskRoutes = require('./taskRoutes');
const authRoutes = require('./auth.routes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);

module.exports = router;