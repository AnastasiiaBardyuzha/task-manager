import { Task } from '../models/taskModel.js';

export const getTasksByUserId = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find(
      { createdBy: userId }
    );

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message })
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message })
  }
};


export const createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user._id;

    const taskObject = {
      description,
      createdBy: userId
    }

    const task = await Task.create(taskObject);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId },
      req.body,
      {
        new: true, //return updated task object
        runValidators: true // run validate
      }
    );

    if (!task) {
      return res.status(404).json({message: 'Task not found'});
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id;

    const task = await Task.findByIdAndDelete(
      {
        _id: taskId,
        createdBy: userId
      }
    );

    if (!task) {
      return res.status(404).json({message: 'Task not found'});
    }

    return res.status(200).json({message: 'Task successfully deleted'});
  } catch (error) {
    return res.status(400).json({ message: 'Failed to delete task' });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id;

    const task = await Task.findOne(
      {
        _id: taskId,
        createdBy: userId
      }
    );

    if (!task) {
      return res.status(404).json({message: 'Task not found'});
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to find task' });
  }
};
