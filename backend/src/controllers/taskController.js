const {
    validateTask,
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../services/taskService');

async function createTaskController(req, res) {
    try {
        const error = validateTask(req.body);

        if (error) {
            return res.status(400).json({
                error: {
                    code: 'INVALID_INPUT',
                    message: error
                }
            });
        }

        const task = await createTask(req.body);

        return res.status(201).json(task);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Une erreur interne est survenue'
            }
        });
    }
}

async function getTasksController(req, res) {
    try {
        const tasks = await getTasks();

        return res.status(200).json({
            items: tasks
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Une erreur interne est survenue'
            }
        });
    }
}

async function updateTaskController(req, res) {
    try {
        const error = validateTask(req.body, true);

        if (error) {
            return res.status(400).json({
                error: {
                    code: 'INVALID_INPUT',
                    message: error
                }
            });
        }

        const result = await updateTask(req.params.id, req.body);

        if (result.error === 'INVALID_ID') {
            return res.status(400).json({
                error: {
                    code: 'INVALID_INPUT',
                    message: 'Identifiant invalide'
                }
            });
        }

        if (result.error === 'NOT_FOUND') {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Tâche introuvable'
                }
            });
        }

        return res.status(200).json(result.task);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Une erreur interne est survenue'
            }
        });
    }
}

async function deleteTaskController(req, res) {
    try {
        const result = await deleteTask(req.params.id);

        if (result.error === 'INVALID_ID') {
            return res.status(400).json({
                error: {
                    code: 'INVALID_INPUT',
                    message: 'Identifiant invalide'
                }
            });
        }

        if (result.error === 'NOT_FOUND') {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Tâche introuvable'
                }
            });
        }

        return res.status(204).send();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Une erreur interne est survenue'
            }
        });
    }
}

module.exports = {
    createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController
};