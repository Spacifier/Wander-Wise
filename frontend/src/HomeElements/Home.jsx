import React, { useEffect, useState } from "react";
import { useAuth } from "../root/AuthProvider.jsx";

function Home() {
    const { user, logout } = useAuth();

    return(
        <div className="h-screen w-screen flex flex-col home">
            <h2 className="absolute-center text-gray-50 font-semibold text-5xl font-[azonix]">
                Welcome, {user?.username || "Guest"}
            </h2>
        </div>
    );
}

export default Home