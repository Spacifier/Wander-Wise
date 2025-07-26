import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createItinerary, createTrip, getAllTrips, getTripById } from "../controllers/trip.controller.js";

const router = Router();

router.route("/create").post(verifyJWT,createTrip);
router.route("/all").get(getAllTrips);
router.route("/:tripId").get(getTripById);
router.route("/create-itinerary").post(createItinerary);

export default router;