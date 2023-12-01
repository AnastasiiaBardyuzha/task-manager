import express from 'express';
import {
  getTask,
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks
} from '../controllers/taskController.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

//middleware
router.use(checkAuth)

router.post('/task', createTask);
router.get('/tasks', getTasksByUserId);
router.get('/tasks/all', checkAdmin, getAllTasks);
router.get('/task/:id', getTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

export default router;
