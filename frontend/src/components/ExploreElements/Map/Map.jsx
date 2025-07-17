import React, { useState } from "react";
import GoogleMapReact, { latLng2Tile } from 'google-map-react'
import { useMediaQuery } from 'react-responsive';
import { MdLocationPin } from "react-icons/md";
import "./Map.css"
import mapStyles from "./MapStyles.js"
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function Map({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}){
    const isDesktop = useMediaQuery({ query: '(min-width: 600px)' });

    return (
      <div className="w-full h-full">
           <GoogleMapReact
                bootstrapURLKeys={{key: GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child)}
           >
                {places?.map((place, i) => (
                <div
                    key={i}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    className="relative"
                    onClick={() => setChildClicked(i)}
                >
                    {/* Small map pin for mobile */}
                    {!isDesktop ? (
                    <div className="text-4xl"><MdLocationPin /></div>
                    ) : (
                        <div className="card">
                                <img
                                    src={
                                    place.photo?.images?.large?.url ||
                                    "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                                    }
                                    alt={place.name}
                                    className="img"
                                />
                                <div className="textBox">
                                    <p className="head">{place.name}</p>
                                    <span>Restaurant</span>
                                    <p className="price">★ {place.rating || "N/A"} • {place.num_reviews || 0}</p>
                                </div>
                        </div>
                    )}
                </div>
                ))}

            {/* Weather markers */}
            {weatherData.map((data, i) => (
                <div key={i} lat={data.lat} lng={data.lon}>
                    <img
                    src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`}
                    alt={data.current.weather[0].description}
                    title={`${data.current.weather[0].description}, ${data.current.temp}°C`}
                    className="h-[60px] w-[60px]"
                    />
                </div>
            ))}

           </GoogleMapReact>
       </div>
    );
}

export default Map