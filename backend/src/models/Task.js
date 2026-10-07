const mongoose = require('mongoose');

const TASK_STATUSES = ['todo', 'doing', 'done'];

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000
        },

        status: {
            type: String,
            enum: TASK_STATUSES,
            default: 'todo'
        },

        dueDate: {
            type: Date,
            default: null
        },

        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = {
    Task
};