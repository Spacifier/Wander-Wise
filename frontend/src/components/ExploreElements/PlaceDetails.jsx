import React from 'react';
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdCall } from "react-icons/io";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div
        ref={refProp}
        className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200"
    >
        {/* Image */}
        <img
            src={place.photo? place.photo.images?.large?.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            alt={place.name}
            className="w-full h-[220px] object-cover"
        />
        {/* Content */}
        <div className="p-4 space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>

            {/* Rating and reviews */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{place.rating || 'N/A'}</span>
                    </div>
                    <span>{place.num_reviews || 0} review{place.num_reviews > 1 ? 's' : ''}</span>
                </div>

            {/* Price + Ranking */}
            {place.price_level && (
                <div className="flex justify-between text-sm text-gray-700">
                    <span className="font-medium">Price:</span>
                    <span>{place.price_level}</span>
                </div>
            )}
            {place.ranking && (
                <div className="flex justify-between text-sm text-gray-700">
                    <span className="font-medium">Ranking:</span>
                    <span>{place.ranking}</span>
                </div>
            )}

            {/* Awards */}
            {place?.awards?.map((award, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <img src={award.images.small} alt={award.display_name} className="w-5 h-5" />
                    <span>{award.display_name}</span>
                </div>
            ))}

            {/* Cuisine Chips */}
            {place?.cuisine && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {place.cuisine.map(({ name }, i) => (
                    <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                        {name}
                    </span>
                    ))}
                </div>
            )}

            {/* Address */}
            {place.address && (
                <div className="flex items-start text-sm text-gray-600 gap-1 mt-2">
                    <span className='text-xl'><MdOutlineLocationOn /></span>
                    <span>{place.address}</span>
                </div>
            )}

            {/* Phone */}
            {place.phone && (
                <div className="flex items-center text-sm text-gray-600 gap-1">
                    <span className='text-lg'><IoMdCall /></span>
                    <span>{place.phone}</span>
                </div>
            )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 px-4 pb-4 mt-2">
            {place.web_url && (
                <button
                    onClick={() => window.open(place.web_url, '_blank')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    TripAdvisor
                </button>
            )}
            {place.website && (
                <button
                    onClick={() => window.open(place.website, '_blank')}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Website
                </button>
            )}
        </div>
    </div>
);
};

export default PlaceDetails;
