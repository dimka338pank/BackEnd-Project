import { Router } from "express";
import { authGuard } from "../middlewares/authGuard.js";
import { getProfile, updateProfileController } from "../controllers/user.controller.js";
import { validateSchema } from "../../sprint1/middlewares/validateRegistration.js";
import { UpdateProfileSchema } from "../middlewares/authSchemas2.js";


const router = Router();
router.get("/me", authGuard, getProfile);
router.put("/me", authGuard, validateSchema(UpdateProfileSchema), updateProfileController);

export default router;