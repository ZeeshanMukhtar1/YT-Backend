import { health } from "../controllers/health.controller.js";

import { Router } from "express";
const router = Router();

router.route("/").get(health);

export default router;
