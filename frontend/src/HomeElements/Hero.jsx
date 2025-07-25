import { Link } from "react-router-dom";
import { useAuth } from "../root/AuthProvider.jsx";
import { Button } from "../../components/index.js";

function Hero(){
    const { user, logout } = useAuth();

    return(
        <div className="relative h-dvh w-screen overflow-x-hidden home">
            <h2 className="absolute top-25 left-15 text-gray-50  text-6xl font-[ailerons] hover:text-gray-100">
                Welcome, {user?.username || "Guest"}
            </h2>
            <div className="absolute bottom-15 right-15">
                <h2 className="text-gray-50 font-semibold text-7xl font-[ailerons] hover:text-gray-100">
                    Plan Your <br />
                    Trip With Ease
                </h2>
                <p className="text-[#003311] font-[orkney] m-2">
                    Customize your travel itinerary in minutes- <br />
                    pick your destination, set your preferences and explore
                </p>
                <Button text="Create Trip" url="/admin/trips/create" style="mt-2"/>
            </div>
        </div>
    );
}

export default Hero