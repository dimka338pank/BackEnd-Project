import { CreateTask, GetTasks } from "../services/task.service.js";

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