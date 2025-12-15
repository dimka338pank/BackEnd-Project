import { CreateTask, GetTasks, DeleteTask, UpdateTask } from "../services/task.service.js";

export const createTask = async (req, res) => {
    const { title, description } = req.body;
     try {
       const result = await CreateTask( { title, description }, req.userId);
       return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
}

export const getTasks = async (req, res) => {
     try {
       const result = await GetTasks(req.userId);
       return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
}

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { done, title, description } = req.body;

  try {
    const result = await UpdateTaskService(req.userId, taskId, { done, title, description });
    return res.status(200).json(result);
  } catch (err) {
    if (!taskId) {
      return res.status(400).json({
        errors: ["Invalid taskId: taskId is required"]
      });
    }
    if (err.message === "FORBIDDEN") {
      return res.status(403).json({ error: "User does not have access to this resource" });
    }
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Invalid taskId: no task found with this taskId" });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const {taskId} = req.params   
  try {
       const result = await DeleteTask(req.userId, taskId)

       return res.status(200).json({ deleted: result });
    } catch (err) {
      if (!taskId) {
        return res.status(400).json({
          errors: ["Invalid taskId: taskId is required"]});
        }
      if (err.message === 'FORBIDDEN') {
        return res.status(403).json({ error: "User does not have access to this resource" });
      }
      if (err.message === "NOT_FOUND"){
       return res.status(404).json({ error: "Invalid taskId: no task found with this taskId" }); 
      }
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
}