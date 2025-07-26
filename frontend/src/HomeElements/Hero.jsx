import { Link } from "react-router-dom";
import { useAuth as getAuth } from "../root/AuthProvider.jsx";
import { Button } from "../../components/index.js";
import { useEffect } from "react";

function Hero(){
    const { user, logout } = getAuth();

    return(
        <div className="relative h-dvh w-screen overflow-x-hidden home">
            <h2 className="absolute top-25 left-15 text-gray-50  text-6xl font-[ailerons]">
                Welcome, {user?.username || "Guest"}
            </h2>
            <div className="absolute bottom-15 right-15">
                <h2 className="text-gray-50 font-semibold text-7xl font-[ailerons]">
                    Plan Your <br />
                    Trip With Ease
                </h2>
                <p className="text-gray-50 font-[orkney] m-2">
                    Customize your travel itinerary in minutes- <br />
                    pick your destination, set your preferences and explore
                </p>
                <Button text="Create Trip" url="/travel/create" style="mt-2"/>
            </div>
        </div>
    );
}

export default Hero