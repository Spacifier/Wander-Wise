import React, { useEffect, useState } from "react";
import List from './List.jsx';
import Map from "./Map/Map.jsx";
import { getPlacesData, getWeatherData } from "../../api/index.js";

const mockPlaces = [
  {
    name: "Sunset Grill",
    latitude: 22.6139,
    longitude: 73.2090,
    rating: "4.5",
    num_reviews: 124,
    price_level: "$$",
    ranking: "#12 of 540 Restaurants in Delhi",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1555992336-cbf00c12f2e2"
        }
      }
    },
    awards: [
      {
        images: {
          small: "https://www.pngkey.com/png/full/233-2332677_trophy-icon-award-icon-png.png"
        },
        display_name: "Certificate of Excellence 2023"
      }
    ],
    cuisine: [
      { name: "Indian" },
      { name: "Asian" },
      { name: "Vegetarian Friendly" }
    ],
    address: "123 Connaught Place, Delhi, India",
    phone: "+91 9876543210",
    web_url: "https://www.tripadvisor.com/Restaurant_Review-mock",
    website: "https://sunsetgrill.example.com"
  },
  {
    name: "Urban Coffee House",
    latitude: 28.6145,
    longitude: 77.2082,
    rating: "4.0",
    num_reviews: 87,
    price_level: "$",
    ranking: "#45 of 540 Restaurants in Delhi",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90"
        }
      }
    },
    awards: [],
    cuisine: [
      { name: "Cafe" },
      { name: "Continental" }
    ],
    address: "56 Janpath Lane, Delhi, India",
    phone: "+91 9988776655",
    web_url: "https://www.tripadvisor.com/Restaurant_Review-mock2",
    website: "https://urbancoffee.example.com"
  },
  {
    name: "La Pergola",
    latitude: 41.9028,
    longitude: 12.4964,
    rating: "4.7",
    num_reviews: 321,
    price_level: "$$$$",
    ranking: "#2 of 100 Restaurants in Rome",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
        }
      }
    },
    address: "Via Alberto Cadlolo, Rome, Italy"
  },
  {
    name: "Ichiran Ramen",
    latitude: 35.6895,
    longitude: 139.6917,
    rating: "4.3",
    num_reviews: 987,
    price_level: "$$",
    ranking: "#5 of 800 Restaurants in Tokyo",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1586081212453-9537f00b0ba4"
        }
      }
    },
    address: "Shibuya City, Tokyo, Japan"
  },
  {
    name: "Joe's Seafood",
    latitude: 41.8781,
    longitude: -87.6298,
    rating: "4.6",
    num_reviews: 420,
    price_level: "$$$",
    ranking: "#1 of 600 Restaurants in Chicago",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1600891964930-18d3e19ff6a4"
        }
      }
    },
    address: "E Grand Ave, Chicago, USA"
  },
  {
    name: "Bondi Icebergs Club",
    latitude: -33.8915,
    longitude: 151.2767,
    rating: "4.4",
    num_reviews: 245,
    price_level: "$$",
    ranking: "#3 of 230 Restaurants in Sydney",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1565895405134-97d6f4c1592b"
        }
      }
    },
    address: "Bondi Beach, Sydney, Australia"
  },
  {
    name: "Noma",
    latitude: 55.6761,
    longitude: 12.5683,
    rating: "4.9",
    num_reviews: 98,
    price_level: "$$$$",
    ranking: "#1 of 150 Restaurants in Copenhagen",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1617191518406-2989c78d43ed"
        }
      }
    },
    address: "Refshalevej, Copenhagen, Denmark"
  },
  {
    name: "Chez Janou",
    latitude: 48.8566,
    longitude: 2.3522,
    rating: "4.2",
    num_reviews: 300,
    price_level: "$$",
    ranking: "#25 of 1300 Restaurants in Paris",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1543340900-2d1c5e4b4d74"
        }
      }
    },
    address: "Rue Roger Verlomme, Paris, France"
  },
  {
    name: "Bo-Kaap Deli",
    latitude: -33.9249,
    longitude: 18.4241,
    rating: "4.5",
    num_reviews: 185,
    price_level: "$",
    ranking: "#7 of 450 Restaurants in Cape Town",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445"
        }
      }
    },
    address: "Bo-Kaap, Cape Town, South Africa"
  },
  {
    name: "El Celler de Can Roca",
    latitude: 41.9794,
    longitude: 2.8214,
    rating: "4.8",
    num_reviews: 205,
    price_level: "$$$$",
    ranking: "#1 of 100 Restaurants in Girona",
    photo: {
      images: {
        large: {
          url: "https://images.unsplash.com/photo-1598514982305-98db46999cdd"
        }
      }
    },
    address: "Can Sunyer, Girona, Spain"
  }
];
const mockWeatherData = [
    {
        lat: 22.6139,
        lon: 71.2090,
        timezone: "Asia/Kolkata",
        timezone_offset: 19800,
        current: {
            dt: 1656142800,
            sunrise: 1656116914,
            sunset: 1656165966,
            temp: 31.2,
            feels_like: 35.6,
            pressure: 1008,
            humidity: 60,
            dew_point: 22.3,
            uvi: 7.58,
            clouds: 40,
            visibility: 6000,
            wind_speed: 3.6,
            wind_deg: 220,
            weather: [
            {
                id: 200,
                main: "Clouds",
                description: "scattered clouds",
                icon: "11d"
            }
            ]
        }
    },
  {
    lat: 28.6139,
    lon: 77.2090,
    current: {
      temp: 31.2,
      weather: [{ icon: "03d", description: "scattered clouds" }]
    }
  },
  {
    lat: 40.7128,
    lon: -74.0060,
    current: {
      temp: 22.5,
      weather: [{ icon: "10d", description: "light rain" }]
    }
  },
  {
    lat: 48.8566,
    lon: 2.3522,
    current: {
      temp: 26.1,
      weather: [{ icon: "01d", description: "clear sky" }]
    }
  },
  {
    lat: -33.8688,
    lon: 151.2093,
    current: {
      temp: 18.7,
      weather: [{ icon: "04n", description: "broken clouds" }]
    }
  },
  {
    lat: 35.6895,
    lon: 139.6917,
    current: {
      temp: 29.3,
      weather: [{ icon: "02d", description: "few clouds" }]
    }
  },
  {
    lat: -23.5505,
    lon: -46.6333,
    current: {
      temp: 25.9,
      weather: [{ icon: "09d", description: "shower rain" }]
    }
  },
  {
    lat: 55.7558,
    lon: 37.6173,
    current: {
      temp: 15.4,
      weather: [{ icon: "13d", description: "snow" }]
    }
  },
  {
    lat: 51.5074,
    lon: -0.1278,
    current: {
      temp: 19.8,
      weather: [{ icon: "50d", description: "mist" }]
    }
  },
  {
    lat: 41.9028,
    lon: 12.4964,
    current: {
      temp: 28.0,
      weather: [{ icon: "01d", description: "sunny" }]
    }
  }
];

function Explore() {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: 28.6139, lng: 77.2090 });     
    const [bounds, setBounds] = useState(null);
    const [childClicked,setChildClicked] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    const [filteredPlaces,setFilteredPlaces] = useState([]);
    const [weatherData,setWeatherData] = useState([mockWeatherData]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
            setCoordinates({lat: latitude, lng:longitude});
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = mockPlaces.filter((place) => place.rating > rating)
        setFilteredPlaces(filteredPlaces);
    }, [rating])

    useEffect(() => {
        if (bounds && bounds.sw && bounds.ne) {
            setIsLoading(true)

            getWeatherData(coordinates.lat,coordinates.lng)
                .then((data) => setWeatherData(data))

            // getPlacesData(type, bounds.sw, bounds.ne)
            // .then((data) => {
            //     setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            //     setFilteredPlaces([]);
            //     setRating('');
            //     setIsLoading(false);
            // });
            setIsLoading(false);
        }
    }, [bounds, type, coordinates]);

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col">
            {/* Top Header Image (or Navbar) */}
            <div className="h-22 overflow-hidden">
                <img
                    src="/img/banner-2.jpg"
                    alt="Mountain background"
                    className="w-full h-full object-cover object-top"
                />
            </div>

            {/* Main Content: fills remaining height */}
            <div className="flex flex-1 flex-col md:flex-row gap-4 px-4 overflow-hidden">
                {/* Left Panel - List */}
                <div className="w-full md:w-1/3 h-full overflow-hidden">
                    <List 
                        places = {filteredPlaces.length ? filteredPlaces : mockPlaces}
                        childClicked = {childClicked}
                        isLoading = {isLoading}
                        type={type}
                        setType={setType}
                        setRating={setRating}
                        setCoordinates={setCoordinates}
                    />
                </div>

                {/* Right Panel - Map */}
                <div className="w-full md:w-2/3 h-full overflow-hidden">
                    <Map 
                    setCoordinates = {setCoordinates}
                    setBounds = {setBounds}
                    coordinates = {coordinates}
                    places = {filteredPlaces.length ? filteredPlaces : mockPlaces}
                    setChildClicked = {setChildClicked}
                    weatherData={mockWeatherData}
                    />
                </div>
            </div>
        </div>
    );
}

export default Explore;
