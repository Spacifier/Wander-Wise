import React, { useState, useEffect, createRef } from 'react';
import PlaceDetails from './PlaceDetails.jsx';
import styled from 'styled-components';
import { Autocomplete } from '@react-google-maps/api';

const List = ({ type, setType, rating, setRating, places, childClicked, isLoading, setCoordinates}) => {
    const [elRefs, setElRefs] = useState([]);
    const [autocomplete,setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat  = autocomplete.getPlace().geometry.location.lat();
        const lng  = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat, lng});
    }
    
    useEffect(() => {
        setElRefs((refs) =>
        Array(places.length)
            .fill()
            .map((_, i) => refs[i] || createRef())
        );
    }, [places]);

    return (
        <div className="p-6 w-full h-full overflow-y-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
                {/* Title */}
                <h2 className="text-2xl font-bold">Food & Dining around you</h2>
                {/* Search Box with Autocomplete */}
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <StyledWrapper>
                    <input placeholder="Search on map..." className="input" />
                    </StyledWrapper>
                </Autocomplete>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent">loading</div>
                </div>
            ) : (
            <>
            {/* Dropdown Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Type Selector */}
                <div className="min-w-[120px]">
                    <label htmlFor="type" className="block text-xs text-gray-700 mb-1">Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-3 py-2 border text-xs border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="restaurants">Restaurants</option>
                        <option value="hotels">Hotels</option>
                        <option value="attractions">Attractions</option>
                    </select>
                </div>
                {/* Rating Selector */}
                <div className="min-w-[120px]">
                    <label htmlFor="rating" className="block text-xs text-gray-700 mb-1">Rating</label>
                    <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="px-3 py-2 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <option value="">All</option>
                    <option value="3.0">Above 3.0</option>
                    <option value="4.0">Above 4.0</option>
                    <option value="4.5">Above 4.5</option>
                    </select>
                </div>
            </div>

            {/* Place List */}
            <div className="h-[75vh] overflow-auto space-y-4 scroll-smooth">
                {places?.map((place, i) => (
                    <div key={i} ref={elRefs[i]}>
                        <PlaceDetails
                        selected={Number(childClicked) === i}
                        place={place}
                        refProp={elRefs[i]}
                        />
                    </div>
                ))}
            </div>
            </>
            )}
        </div>
    );
};

const StyledWrapper = styled.div`
  .input {
    border: 2px solid transparent;
    width: 12em;
    height: 2.5em;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: white;
    border-radius: 10px;
    transition: all 0.5s;
  }

  .input:hover,
  .input:focus {
    border: 2px solid #4a9dec;
    box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
    background-color: white;
  }`;

export default List;
