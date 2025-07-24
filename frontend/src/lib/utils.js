import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

// Merge Tailwind + conditionally applied classNames
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format date like "July 21, 2025"
export const formatDate = (dateString) => {
  return dayjs(dateString).format("MMMM DD, YYYY");
};

// Parse code blocks in markdown like ```json {...}
export function parseMarkdownToJson(markdownText) {
    const regex = /```json\n([\s\S]+?)\n```/;
    const match = markdownText.match(regex);

    if (match && match[1]) {
        try {
        return JSON.parse(match[1]);
        } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
        }
    }
    console.error("No valid JSON found in markdown text.");
    return null;
}

// If your Trip object is not typed, this is plain JSON.parse
export function parseTripData(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse trip data:", error);
    return null;
  }
}

// Extract first word from a string
export function getFirstWord(input = "") {
  return input.trim().split(/\s+/)[0] || "";
}

// Calculate trend change
export const calculateTrendPercentage = (thisMonth, lastMonth) => {
  if (lastMonth === 0) {
    return thisMonth === 0
      ? { trend: "no change", percentage: 0 }
      : { trend: "increment", percentage: 100 };
  }

  const change = thisMonth - lastMonth;
  const percentage = Math.abs((change / lastMonth) * 100);

  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};

// Format camelCase or PascalCase keys to readable form
export const formatKey = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export const getRandomAvatar = () => {
  const total = 9; // total number of default images
  const randomIndex = Math.floor(Math.random() * total) + 1;
  return `/avatars/default${randomIndex}.jpg`;
};

export const fetchAllUsers = async (limit = 10, page = 1) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/users/all-users?limit=${limit}&page=${page}`, {
            method: "GET",
            credentials: "include"
        });

        const { data } = await res.json();

        return {
            users: data?.users || [],
            total: data?.total || 0,
        };
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return {
            users: [],
            total: 0,
        };
    }
};


export const fetchTripById = async (tripId) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/trips/${tripId}`, {
            method: "GET",
            credentials: "include",
        });

        const result = await res.json();

        if (!res.ok) {
            return { trip: null, err: result.message || "Failed to fetch trip" };
        }

        return { trip: result.data, err: null };
    } catch (error) {
        return { trip: null, err: error.message || "Unexpected error" };
    }
};

export const fetchCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,latlng,flags,maps");
        const data = await response.json();

        const formattedCountries = data.map((country) => ({
            name: `${country.flags?.emoji || ""} ${country.name.common}`,
            coordinates: country.latlng,
            value: country.name.common,
            openStreetMap: country.maps?.openStreetMap,
        }));

        return formattedCountries;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
};


export const fetchAllTrips = async (limit = 10, page = 1) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/trips/all?limit=${limit}&page=${page}`, {
            method: "GET",
            credentials: "include"
        });

        const { data } = await res.json();
        return {
            trips: data?.allTrips || [],
            total: data?.total || 0,
        };
    } catch (error) {
        console.error("Failed to fetch trips:", error);
        return {
            trips: [],
            total: 0,
        };
    }
};

// Fetch dashboard statistics
export const fetchUsersAndTripsStats = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/dashboard/stats`, {
            method: "GET",
            credentials: "include"
        });

        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return null;
    }
};

// Fetch user growth per day
export const fetchUserGrowthPerDay = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/dashboard/user-growth`, {
            method: "GET",
            credentials: "include"
        });

        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user growth data:", error);
        return [];
    }
};

// Fetch trip growth per day
export const fetchTripGrowthPerDay = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/dashboard/trip-growth`, {
            method: "GET",
            credentials: "include"
        });

        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch trip growth data:", error);
        return [];
    }
};

// Fetch trip breakdown by travel style
export const fetchTripsByTravelStyle = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/dashboard/travel-style`, {
            method: "GET",
            credentials: "include"
        });

        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch trips by travel style:", error);
        return [];
    }
};
