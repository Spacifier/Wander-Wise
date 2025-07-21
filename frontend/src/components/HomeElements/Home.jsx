import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../lib/utils";
import { user as defaultUser } from "../../constants";

function Home() {
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        getCurrentUser().then(setUser).catch(console.error);
    },[])

    return(
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            <h2>Welcome, {user?.username || "Guest"}</h2>
        </div>
    );
}

export default Home