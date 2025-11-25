import { Router } from "express";
import { registration, login } from "../controllers/auth.controller.js";
import {RegistrationUserSchema, LoginUserSchema} from "../middlewares/authSchemas.js"
import { validateSchema } from "../middlewares/validateRegistration.js";

const router = Router();

router.post("/registration", validateSchema(RegistrationUserSchema), registration);
router.post("/login", validateSchema(LoginUserSchema), login);

export default router;