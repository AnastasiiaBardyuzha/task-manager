import mongoose, { Schema, model } from 'mongoose';

const TaskSchema = Schema({
    description: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    //ref to User who created the task
    createdBy: {
        //type of id of task from mongo.db
        type: mongoose.Schema.Types.ObjectId,
        //ref to User model
        ref: 'User',
    },
});

export const Task = model('Task', TaskSchema);
