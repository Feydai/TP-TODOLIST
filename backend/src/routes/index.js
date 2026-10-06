const { Router } = require('express');
const healthRoutes = require('./health.routes');
const taskRoutes = require('./taskRoutes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;