import dotenv from "dotenv";
dotenv.config();
import {GoogleGenerativeAI} from "@google/generative-ai";
import mongoose,{isValidObjectId} from "mongoose";
import { Trip } from "../models/trip.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { parseMarkdownToJson } from "../../../frontend/src/lib/utils.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const createTrip = asyncHandler(async(req,res) => {
    const { country, numberOfDays, travelStyle, interests, budget, groupType, userId } = req.body;
    if (!country || !numberOfDays || !travelStyle || !interests || !budget || !groupType || !userId) {
        throw new ApiError(400, "Missing required fields");
    }

    try {

        const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
            Budget: '${budget}'
            Interests: '${interests}'
            TravelStyle: '${travelStyle}'
            GroupType: '${groupType}'
            Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
            {
            "name": "A descriptive title for the trip",
            "description": "A brief description of the trip and its highlights not exceeding 100 words",
            "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
            "duration": ${numberOfDays},
            "budget": "${budget}",
            "travelStyle": "${travelStyle}",
            "country": "${country}",
            "interests": ${interests},
            "groupType": "${groupType}",
            "bestTimeToVisit": [
            '🌸 Season (from month to month): reason to visit',
            '☀️ Season (from month to month): reason to visit',
            '🍁 Season (from month to month): reason to visit',
            '❄️ Season (from month to month): reason to visit'
            ],
            "weatherInfo": [
            '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
            '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
            ],
            "location": {
            "city": "name of the city or region",
            "coordinates": [latitude, longitude],
            "openStreetMap": "link to open street map"
            },
            "itinerary": [
            {
            "day": 1,
            "location": "City/Region Name",
            "activities": [
                {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
                {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
                {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
            ]
            },
            ...
            ]
        }`;

        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const rawText = result.response.text();
        const parsedTrip = parseMarkdownToJson(rawText);

        //fetch images
        const unsplashRes = await fetch(
            `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
        );
        const images = await unsplashRes.json();
        const imageUrls= images?.results?.slice(0,3).map((result) => result.urls?.regular || "") || [];

        //save to DB
        const newTrip = await Trip.create({
            tripDetail: JSON.stringify(parsedTrip),
            imageUrls,
            owner: userId
        });
        if(!newTrip){
            throw new ApiError(500,"Something went wrong while storing trip")
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {tripId: newTrip._id},
                    "Trip Generated Successfully"
                )
            )

    } catch (error) {
        console.error(error)
        throw new ApiError(500,"Failed to generate Trip")
    }
})

const getAllTrips = asyncHandler( async(req,res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page-1) * limit;

    const total = await Trip.countDocuments();
    const allTrips = await Trip.find().sort({createdAt: -1}).skip(skip).limit(limit).select("-__v");

    if(total === 0){
        return res
        .status(200)
        .json(
            new ApiResponse(200, {allTrips: [], total:0}, "No Trips to be fetched")
        )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {allTrips, total}, "Trips fetched successfully")
        )
})

const getTripById = asyncHandler( async(req,res) => {
    const {tripId} = req.params;
    if(!isValidObjectId(tripId)){
        throw new ApiError(400, "Invalid trip ID");
    }

    const trip = await Trip.findById(tripId).populate("owner", "username email avatar");
    if(!trip){
        throw new ApiError(404, "Trip not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, trip, "Trip details fetched successfully")
        )
})

export {
    createTrip,
    getAllTrips,
    getTripById
}