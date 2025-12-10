import { User } from "./user.model.js";
import { UserTask } from "./user-task.model.js";
import { Task } from "./task.model.js";

User.belongsToMany(Task, {
  through: UserTask,
  foreignKey: "userId",
  otherKey: "taskId"
});

Task.belongsToMany(User, {
  through: UserTask,
  foreignKey: "taskId",
  otherKey: "userId"
});

export { User, Task, UserTask };