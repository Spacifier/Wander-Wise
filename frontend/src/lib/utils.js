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
