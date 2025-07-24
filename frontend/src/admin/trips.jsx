import { useEffect, useState } from "react";
import { Header } from "../../components";
import { fetchAllTrips } from "../lib/utils";

function Trips(){
    const [trips,setTrips] = useState();
    useEffect(() => {
        const loadTrips = async () => {
            const result = await fetchAllTrips(); // optionally pass limit and offset
            setTrips(result);
        };

        loadTrips();
    }, []);

    return (
       <main className="all-users wrapper">
             <Header
                title = "Trips"
                description = "View and edit AI generated travel plans"
                ctaText= "Create a trip"
                ctaUrl = "/admin/trips/create"
            />
       </main>
    );
}

export default Trips