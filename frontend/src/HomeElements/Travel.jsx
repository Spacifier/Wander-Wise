import { useEffect, useState } from "react";
import { fetchAllTrips, parseTripData } from "../lib/utils";
import { Header, Loader, TravelCard, TripCard } from "../../components";

function Travel(){
    const [allTrips,setAllTrips] = useState();
    const [totalTrips,setTotalTrips] = useState();

    useEffect(() => {
        const loadTrips = async () => {
            const {trips, total} = await fetchAllTrips(4,1);
            setAllTrips(trips.map(({_id, tripDetail, imageUrls}) => ({
                id: _id,
                ...parseTripData(tripDetail),
                imageUrls: imageUrls ?? []
            })));;
            setTotalTrips(total);
        };
        loadTrips();
    }, []);

    if (!allTrips) {
        return (
            <main className="h-screen w-screen flex flex-col flex-center wrapper ">
                <Loader />
            </main>
        );
    }

    return (
       <div className="h-screen w-screen flex flex-col wrapper">
            <h2 className="text-5xl font-[orkney] m-15">
                Explore <br />
                Latest Trips
            </h2>
            <div className="flex ">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-4">
                    {allTrips.map(({id, name, imageUrls, itinerary, interests, travelStyle, estimatedPrice}) => (
                        <TravelCard
                            id={id}
                            key={id}
                            name={name}
                            location={itinerary?.[0].location ?? ''}
                            imageUrl={imageUrls[0]}
                            tags={[interests, travelStyle]}
                            price={estimatedPrice}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Travel