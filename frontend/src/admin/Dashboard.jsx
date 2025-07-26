import { useEffect, useState } from "react";
import { Header, Loader, StatsCard, TripCard } from "../../components";
import { useAuth } from "../root/AuthProvider";
import { 
    fetchAllTrips, 
    fetchAllUsers, 
    fetchTripsByTravelStyle, 
    fetchUserGrowthPerDay, 
    fetchUsersAndTripsStats, 
    getRandomAvatar, 
    parseTripData 
} from "../lib/utils";
import {Category, ChartComponent, ColumnSeries, DataLabel, Inject, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip} from '@syncfusion/ej2-react-charts';
import { tripXAxis, tripyAxis, userXAxis, useryAxis } from "../constants";
import {ColumnDirective, ColumnsDirective, GridComponent} from "@syncfusion/ej2-react-grids";   

function Dashboard(){  
    const { user, logout } = useAuth();
    const [allTrips,setAllTrips] = useState(null);
    const [dashboardStats,setDashboardStats] = useState(null);
    const [allUsers,setAllUsers] = useState(null);
    const [userGrowth,setUserGrowth] = useState(null);
    const [tripsByTravelStyle,setTripsByTravelStyle] = useState(null);
    useEffect(() => {
        const fetchDashboardData = async() => {
            const [
                dashboard,
                {trips},
                userGrow,
                tripsByStyle,
                {users}
            ] = await Promise.all([
                fetchUsersAndTripsStats(),
                fetchAllTrips(4,1),
                fetchUserGrowthPerDay(),
                fetchTripsByTravelStyle(),
                fetchAllUsers(4,1)
            ])
            setDashboardStats(dashboard);
            setAllTrips(trips.map(({_id, tripDetail, imageUrls}) => ({
                id: _id,
                ...parseTripData(tripDetail),
                imageUrls: imageUrls ?? []
            })));;
            setAllUsers(users.map(({avatar, username, itineraryCount}) => ({
                imageUrl:avatar,
                name:username,
                count: itineraryCount ?? Math.floor(Math.random()*10)
            })));
            setUserGrowth(userGrow);
            setTripsByTravelStyle(tripsByStyle);

        };
        fetchDashboardData();
    },[])
    if (!dashboardStats || !allTrips || !userGrowth || !tripsByTravelStyle || !allUsers) {
        return (
            <main className="h-screen w-screen flex flex-col flex-center wrapper">
                <Loader />
            </main>
        );
    }

    const trips = allTrips.map((trip) => ({
        imageUrl: trip.imageUrls[0],
        name: trip.name,
        interest: trip.interests,
    }))
    const userAndTrips = [
        {
            title: 'Latest user signups',
            dataSource: allUsers,
            field: 'count',
            headerText: 'Trips Created'
        },
        {
            title: 'Trips based on interests',
            dataSource: trips,
            field: 'interest',
            headerText: 'Interests'
        }
    ]

    return (
        <main className="dashboard wrapper">
            <Header 
                title = {`Welcome ${user?.username ?? 'Guest'} 👋`}
                description = "Track activiaty, trends and popular destination in real time"
            />

            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard 
                        headerTitle = "Total Users"
                        total = {dashboardStats.totalUsers}
                        currentMonthCount = {dashboardStats.usersJoined.currentMonth}
                        lastMonthCount = {dashboardStats.usersJoined.lastMonth}
                    />
                    <StatsCard 
                        headerTitle = "Total Trips"
                        total = {dashboardStats.totalTrips}
                        currentMonthCount = {dashboardStats.tripsCreated.currentMonth}
                        lastMonthCount = {dashboardStats.tripsCreated.lastMonth}
                    />
                    <StatsCard 
                        headerTitle = "Active Users"
                        total = {dashboardStats.userRole.total}
                        currentMonthCount = {dashboardStats.userRole.currentMonth}
                        lastMonthCount = {dashboardStats.userRole.lastMonth}
                    />
                </div>
            </section>
            <section className="container">
                <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

                <div className="trip-grid">
                    {allTrips.map(({id, name, imageUrls,itinerary, interests, travelStyle, estimatedPrice}) => (
                        <TripCard 
                            key={id}
                            id={id.toString()}
                            name ={name}
                            imageUrl = {imageUrls[0]}
                            location  = {itinerary?.[0]?.location ?? ''}
                            tags = {[interests,travelStyle]}
                            price = {estimatedPrice}
                        />
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ChartComponent
                    id="chart-1"
                    primaryXAxis={userXAxis}
                    primaryYAxis={useryAxis}
                    title="User Growth"
                    tooltip={{enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]}
                    />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="Column"
                            name="Column"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="SplineArea"
                            name="Wave"
                            fill="rgba(71,132,238,0.3)"
                            border={{width: 2,color: '#4784EE'}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
                <ChartComponent
                    id="chart-2"
                    primaryXAxis={tripXAxis}
                    primaryYAxis={tripyAxis}
                    title="Trip Trends"
                    tooltip={{enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]}
                    />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={tripsByTravelStyle}
                            xName="travelStyle"
                            yName="count"
                            type="Column"
                            name="day"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </section>

            <section className="user-trip wrapper">
                {userAndTrips.map(({title, dataSource, field, headerText},i) => (
                    <div key={i} className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100"> {title} </h3>
                        <GridComponent dataSource={dataSource} gridLines="None">
                            <ColumnsDirective>
                                <ColumnDirective 
                                    field="name"
                                    headerText="Name"
                                    width="200"
                                    textAlign="Left"
                                    template={(props) => (
                                        <div className="flex items-center gap-1.5 px-4">
                                            <img src={props.imageUrl || getRandomAvatar()} alt="user" className="rounded-full size-8 aspect-square" referrerPolicy="no-referrer"/>
                                            <span>{props.name}</span>
                                        </div>
                                    )}
                                />
                                <ColumnDirective 
                                    field={field}
                                    headerText={headerText}
                                    width="150"
                                    textAlign="Left"
                                />
                            </ColumnsDirective>
                        </GridComponent>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Dashboard