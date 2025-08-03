import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createItinerary, createTrip, deleteTrip, getAllTrips, getTripById } from "../controllers/trip.controller.js";
import { createPaymentOrder } from "../controllers/payment.controller.js";

const router = Router();

router.route("/create").post(verifyJWT,createTrip);
router.route("/all").get(getAllTrips);
router.route("/:tripId").get(getTripById);
router.route("/create-itinerary").post(createItinerary);
router.route("/delete/:tripId").delete(verifyJWT,deleteTrip);
router.route("/create-payment").post(verifyJWT,createPaymentOrder);


export default router;