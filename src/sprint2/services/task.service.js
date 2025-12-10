import { where } from 'sequelize';
import { Task } from '../../sprint1/models/task.model.js';
import { UserTask } from '../../sprint1/models/user-task.model.js';
import { User } from '../../sprint1/models/user.model.js';
export const CreateTask = async (data, userId) => {
    const { title, description} = data;
    const task = await Task.findOne({
    where: { title, description }
  });
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
}