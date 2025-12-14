import { where } from 'sequelize';
import { Task } from '../../sprint1/models/task.model.js';
import { UserTask } from '../../sprint1/models/user-task.model.js';
import { User } from '../../sprint1/models/user.model.js';
export const CreateTask = async (data, userId) => {
    const { title, description} = data;
<<<<<<< HEAD
    let task = await Task.findOne({
    where: { title, description }
  }); 
=======
    const task = await Task.findOne({
    where: { title, description }
  });
>>>>>>> d8d7f131789c8f822cddae3c713810eb3fc2861c
  if (!task) {
    task = await Task.create({
      title,
      description: description || ""
    });
  }
  await UserTask.findOrCreate({
    where: {
      userId,
      taskId: task.id
    }
  });
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      done: task.done
    }
}

export const GetTasks = async (userId) => {
const tasks = await Task.findAll({
    include: [
      {
        model: User,
        attributes: [], 
        through: { attributes: [] },
        where: { id: userId }  
      }
    ],
    attributes: ["id", "title", "description", "done", "createdAt"] 
  });

  return tasks;
<<<<<<< HEAD
}

export const DeleteTask = async (userId, taskId) => {
  const existingTask = await Task.findByPk(taskId);
  if (!existingTask) throw new Error('NOT_FOUND');
  const relation = await UserTask.findOne({
    where: {
      userId,
      taskId
    }
  });
  if (!relation) throw new Error('FORBIDDEN');
  await UserTask.destroy({
    where: { userId, taskId }
  });
  const count = await UserTask.count({ where: { taskId },
  });
  if (count === 0) {
    const tasks = await Task.destroy({ where: { id: taskId },
  });
  }
    return true;
=======
>>>>>>> d8d7f131789c8f822cddae3c713810eb3fc2861c
}