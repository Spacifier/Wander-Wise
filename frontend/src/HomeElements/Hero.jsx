import { useAuth } from "../root/AuthProvider.jsx";

function Hero(){
    const { user, logout } = useAuth();

    return(
        <div className="h-screen w-screen flex flex-col home">
            <h2 className="absolute top-25 ml-20 text-gray-50  text-6xl font-[ailerons] hover:text-gray-100">
                Welcome, {user?.username || "Guest"}
            </h2>
        </div>
    );
}

export default Hero