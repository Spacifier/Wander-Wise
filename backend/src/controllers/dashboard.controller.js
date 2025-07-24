// src/controllers/dashboard.controller.js
import { User } from "../models/user.model.js";
import { Trip } from "../models/trip.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Utility to filter by date range - it checks if the user was created within that range of time (here the month)
const filterByDate = (items, key, start, end) => {
  return items.filter(item => {
    const date = new Date(item[key]);
    return date >= new Date(start) && (!end || date <= new Date(end));
  }).length;
};

const getUsersAndTripsStats = asyncHandler(async (req, res) => {
    const current = new Date();
    const startCurrent = new Date(current.getFullYear(), current.getMonth(), 1);
    const startPrev = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    const endPrev = new Date(current.getFullYear(), current.getMonth(), 0);

    const [users, trips] = await Promise.all([
        User.find({}, { createdAt: 1, status: 1 }),
        Trip.find({}, { createdAt: 1 }),
    ]);

    const totalUsers = users.length;
    const totalTrips = trips.length;

    const filterUsersByRole = (role) => users.filter(u => u.status === role);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    totalUsers,
                    totalTrips,
                    usersJoined: {
                        currentMonth: filterByDate(users, 'createdAt', startCurrent),
                        lastMonth: filterByDate(users, 'createdAt', startPrev, endPrev)
                    },
                    userRole: {
                        total: filterUsersByRole('user').length,
                        currentMonth: filterByDate(filterUsersByRole('user'), 'createdAt', startCurrent),
                        lastMonth: filterByDate(filterUsersByRole('user'), 'createdAt', startPrev, endPrev)
                    },
                    tripsCreated: {
                        currentMonth: filterByDate(trips, 'createdAt', startCurrent),
                        lastMonth: filterByDate(trips, 'createdAt', startPrev, endPrev)
                    },
                }, 
                "Stats fetched successfully"
            )
        );
});

const getUserGrowthPerDay = asyncHandler(async (req, res) => {
    const users = await User.find({}, { createdAt: 1 });

    const dailyGrowth = users.reduce((acc, user) => {
        const day = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});

    const result = Object.entries(dailyGrowth).map(([day, count]) => ({ day, count }));
    return res
        .status(200)
        .json(new ApiResponse(200, result, "User growth data fetched"));
});

const getTripsCreatedPerDay = asyncHandler(async (req, res) => {
    const trips = await Trip.find({}, { createdAt: 1 });

    const growth = trips.reduce((acc, trip) => {
        const day = new Date(trip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {});

    const result = Object.entries(growth).map(([day, count]) => ({ day, count }));
    return res
        .status(200)
        .json(new ApiResponse(200, result, "Trip growth data fetched"));
});

const getTripsByTravelStyle = asyncHandler(async (req, res) => {
    const trips = await Trip.find({}, { tripDetail: 1 });

    const parsed = trips.map(t => {
        try {
            return JSON.parse(t.tripDetail);
        } catch {
            return null;
        }
    }).filter(Boolean);

    const counts = parsed.reduce((acc, trip) => {
        const style = trip.travelStyle;
        if (style) acc[style] = (acc[style] || 0) + 1;
        return acc;
    }, {});

    const result = Object.entries(counts).map(([travelStyle, count]) => ({ travelStyle, count }));
    return res
        .status(200)
        .json(new ApiResponse(200, result, "Trips by travel style fetched"));
});

export {
    getUsersAndTripsStats,
    getUserGrowthPerDay,
    getTripsCreatedPerDay,
    getTripsByTravelStyle
};
