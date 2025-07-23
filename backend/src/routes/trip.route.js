import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTrip } from "../controllers/trip.controller.js";

const router = Router();

router.route("/create").post(verifyJWT,createTrip);

export default router;