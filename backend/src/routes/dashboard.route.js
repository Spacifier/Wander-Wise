import { Router } from "express";
import { 
    getTripsByTravelStyle, 
    getTripsCreatedPerDay, 
    getUserGrowthPerDay, 
    getUsersAndTripsStats 
} from "../controllers/dashboard.controller.js";

const router = Router();

router.route("/stats").get(getUsersAndTripsStats)
router.route("/user-growth").get(getUserGrowthPerDay)
router.route("/trip-growth").get(getTripsCreatedPerDay)
router.route("/travel-style").get(getTripsByTravelStyle)

export default router;