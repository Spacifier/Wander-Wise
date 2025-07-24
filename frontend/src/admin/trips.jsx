import { useEffect, useState } from "react";
import { Header, TripCard } from "../../components";
import { fetchAllTrips, parseTripData } from "../lib/utils";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

function Trips(){
    const [allTrips,setAllTrips] = useState();
    const [totalTrips,setTotalTrips] = useState();
    const [page,setPage] = useState(1);
    useEffect(() => {
        const loadTrips = async () => {
            const {trips, total} = await fetchAllTrips(8,page); // pass limit and page
            setAllTrips(trips.map(({_id, tripDetail, imageUrls}) => ({
                id: _id,
                ...parseTripData(tripDetail),
                imageUrls: imageUrls ?? []
            })));;
            setTotalTrips(total);
        };
        loadTrips();
    }, [page]);

    if (!allTrips) {
        return (
            <main className="wrapper">
            <Header title="Trip Details" description="Loading trip..." />
            <p className="text-center">Loading...</p>
            </main>
        );
    }

    const handlePangeChange = () => {
        setPage((prev) => prev+1);
    }

    return (
       <main className="all-users wrapper">
             <Header
                title = "Trips"
                description = "View and edit AI generated travel plans"
                ctaText= "Create a trip"
                ctaUrl = "/admin/trips/create"
            />

            <section>
                <h1 className="p-24-semibold text-dark-100 mb-4">
                    Manage Created Trips
                </h1>

                <div className="trip-grid mb-4">
                    {allTrips.map(({id, name, imageUrls, itinerary, interests, travelStyle, estimatedPrice}) => (
                        <TripCard
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

                <PagerComponent 
                    totalRecordsCount={totalTrips}
                    pageSize={8}
                    currentPage={page}
                    click={handlePangeChange}
                    cssClass="!mb-4"
                />
            </section>
       </main>
    );
}

export default Trips