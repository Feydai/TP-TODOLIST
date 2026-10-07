const { Task } = require('../models/Task');
const mongoose = require('mongoose');

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
    const tasks = await Task.find({ ownerId }).sort({ createdAt: -1 });

    return tasks;
}

async function getTask(id, ownerId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { error: 'INVALID_ID' };
    }

    const task = await Task.findOne({ _id: id, ownerId });

    if (!task) {
        return { error: 'NOT_FOUND' };
    }

    return { task };
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
            returnDocument: 'after',
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
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};