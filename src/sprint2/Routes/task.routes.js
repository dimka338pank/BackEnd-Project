import { Router } from "express";
import { validateSchema } from "../../sprint1/middlewares/validateRegistration.js";
import { CreateTaskSchema } from "../middlewares/authSchemas2.js";
import { createTask, getTasks, deleteTask } from "../controllers/task.controller.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = Router();

router.post("/tasks", authGuard, validateSchema(CreateTaskSchema), createTask);
router.get("/tasks", authGuard, getTasks);
router.delete("/tasks/:taskId", authGuard, deleteTask)

export default router;