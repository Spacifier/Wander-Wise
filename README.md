# Wander Wise - AI Powered Travel Planner

Wander Wise is an AI-powered travel planning platform that allows users to:

* Sign up and sign in using a custom authentication system.
* Generate detailed travel itineraries powered by Google Gemini AI.
* View and explore recommended places, countries, and weather data on a dynamic map.
* Create, view, and manage their trips.
* Admins can manage users and have access to a dashboard.

---

## 🔥 Features Implemented

### ✅ Authentication & Authorization

* User Registration and Login with secure cookies
* JWT-based authentication with access & refresh tokens
* Auto refresh of access token via Axios interceptor
* Auth-protected routes (PrivateRoute wrapper)
* Admin role support for accessing special dashboard
* Logout clears both frontend and backend cookie states

### ✅ AI-Powered Trip Generation

* Powered by Google Gemini 1.5 Flash model
* Prompts are designed to generate rich JSON travel itineraries
* Fetches related destination images from Unsplash API
* Saves generated trip data to MongoDB
* Each trip includes itinerary, description, price, best time to visit, weather info, etc.

### ✅ Country & Map Integration

* Uses REST Countries API to populate countries
* World map view with country-specific markers
* Interactive map powered by Syncfusion Maps
* Weather data overlay via OpenWeatherMap API

### ✅ UI/UX

* TailwindCSS & custom SCSS used for styling
* Custom Auth UI with side panels and responsive layout
* Loader and error handling for async calls
* Random avatar generator if no profile image

### ✅ Admin Dashboard

* Lists all registered users
* Role-based access only for admin

### ✅ Protected Routing

* Uses `AuthProvider` context
* `ProtectedRoute.jsx` to guard frontend routes
* Automatically checks auth on page load via `/current-user`

---

## 📌 Features To Be Added Soon

* "All Trips" page to list generated trips by the user
* "Trip Detail" page to view full itinerary & details
* Payment integration (Stripe or Razorpay)
* User profile edit & avatar upload
* Favorites and bookmarks
* Reviews & Ratings for locations
* Export trip as PDF

---

## ⚙️ Tech Stack

### Frontend:

* React + Vite
* React Router DOM v6
* TailwindCSS & SCSS
* Syncfusion React Components
* REST Countries API, OpenWeatherMap API

### Backend:

* Node.js + Express
* MongoDB with Mongoose
* Google Generative AI SDK (Gemini)
* Unsplash API
* JWT for auth
* Cloudinary (optional for image upload)

---

## 🛠️ Environment Variables (.env)

```env
PORT=6700
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_api_key
MONGODB_URI=your_mongodb_connection_string
```

---

## 🧪 Setup Instructions

1. Clone the repository
2. Setup MongoDB and add your .env variables
3. Run backend:

```bash
cd backend
npm install
npm run dev
```

4. Run frontend:

```bash
cd frontend
npm install
npm run dev
```

---

## 🤝 Contributors

* Swapnil Garg (Fullstack Developer)

---

## 🧭 Project Status

This project is actively under development. New features and improvements are regularly being added.
