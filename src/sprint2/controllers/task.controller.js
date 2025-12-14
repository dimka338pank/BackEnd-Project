import { CreateTask, GetTasks, DeleteTask } from "../services/task.service.js";

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

export const deleteTask = async (req, res) => {
    const { taskId } = req.params; 
    const userId = req.userId;
    if (!taskId || isNaN(parseInt(taskId))) { 
        return res.status(400).json({
            error: "Invalid taskId: taskId is required and must be a number in the URL"
        });
    }
    try {
        await DeleteTask(userId, taskId); 
        return res.status(204).send(); 
        
    } catch (err) {
        console.error("Delete Task Error:", err.message);
        if (err.message === 'FORBIDDEN') {
            return res.status(403).json({ 
                error: "User does not have access to this resource" 
            });
        }
        if (err.message === "NOT_FOUND"){
            return res.status(404).json({ 
                error: "Invalid taskId: no task found with this taskId" 
            }); 
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}