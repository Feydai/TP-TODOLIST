const { Task } = require('../models/Task');

const TASK_STATUSES = ['todo', 'doing', 'done'];

const mongoose = require('mongoose');

function validateTask(data, isPatch = false) {

    const allowedFields = [
        'title',
        'description',
        'status',
        'dueDate'
    ];

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return 'Le corps de la requête est invalide';
    }

    const fields = Object.keys(data);

    if (isPatch && fields.length === 0) {
        return 'Aucun champ à modifier';
    }

    for (const field of fields) {
        if (!allowedFields.includes(field)) {
            return `Champ interdit : ${field}`;
        }
    }

    if (!isPatch && data.title === undefined) {
        return 'Le titre est obligatoire';
    }

    if (data.title !== undefined) {
        if (typeof data.title !== 'string') {
            return 'Le titre doit être une chaîne de caractères';
        }

        const title = data.title.trim();

        if (title.length < 1 || title.length > 120) {
            return 'Le titre doit contenir entre 1 et 120 caractères';
        }
    }

    if (data.status !== undefined) {
        if (!TASK_STATUSES.includes(data.status)) {
            return 'Le statut doit être todo, doing ou done';
        }
    }

    if (data.description !== undefined) {
        if (typeof data.description !== 'string') {
            return 'La description doit être une chaîne de caractères';
        }

        if (data.description.length > 1000) {
            return 'La description ne doit pas dépasser 1000 caractères';
        }
    }

    if (data.dueDate !== undefined && data.dueDate !== null) {

        if (
            typeof data.dueDate !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(data.dueDate)
        ) {
            return 'La date doit être au format YYYY-MM-DD';
        }

        const date = new Date(`${data.dueDate}T00:00:00Z`);

        if (Number.isNaN(date.getTime())) {
            return 'La date est invalide';
        }
    }

    return null;
}

async function createTask(data, ownerId) {

    const task = await Task.create({
        title: data.title.trim(),
        description: data.description,
        status: data.status ?? 'todo',
        dueDate: data.dueDate ?? null,
        ownerId
    });

    return task;
}

async function getTasks(ownerId) {
    const tasks = await Task.find({ ownerId });

    return tasks;
}

async function updateTask(id, data, ownerId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { error: 'INVALID_ID' };
    }

    const task = await Task.findOneAndUpdate(
        { _id: id, ownerId },
        {
            ...data,
            ...(data.title !== undefined && {
                title: data.title.trim()
            })
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!task) {
        return { error: 'NOT_FOUND' };
    }

    return { task };
}

async function deleteTask(id, ownerId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { error: 'INVALID_ID' };
    }

    const task = await Task.findOneAndDelete({ _id: id, ownerId });

    if (!task) {
        return { error: 'NOT_FOUND' };
    }

    return { success: true };
}

module.exports = {
    validateTask,
    createTask,
    getTasks,
    updateTask,
    deleteTask
};