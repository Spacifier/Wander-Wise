import { useEffect, useState } from "react";
import { Header } from "../../components";
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns"
import {LayerDirective, LayersDirective, MapsComponent} from '@syncfusion/ej2-react-maps';
import { comboBoxItems, selectItems } from "../constants";
import { cn, fetchCountries, formatKey } from "../lib/utils";
import { world_map } from "../constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useAuth } from "../root/AuthProvider";
import { useNavigate } from "react-router-dom";

function CreateTrips(){
    const [countries,setCountries] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadCountries = async () => {
            const result = await fetchCountries();
            setCountries(result);
        };

        loadCountries();
    }, []);
    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value
    }))

    const [formData,setFormData] = useState({
        country: countries[0]?.name || '',
        travelStyle: '',
        interest: '',
        budget: '',
        duration: 0,
        groupType: ''
    });
    const mapData = [
        {
            country: formData.country,
            color: '#EA382E',
            coordinates: countries.find((c) => c.name === formData.country)?.coordinates || []
        }
    ];

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true);

        const { country, duration, travelStyle, interest, budget, groupType } = formData;
        if (!country || !travelStyle || !interest || !budget || !groupType) {
            setError("Please fill all fields correctly");
            setLoading(false);
            return;
        }
        if(duration<1 || duration>10){
            setError("Duration must be between 1 and 10 days")
            setLoading(false)
            return
        }

        //cheking if user logged in
        if (!user?._id) {
            console.error("User not authenticated");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/trips/create`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    country,
                    numberOfDays: duration,
                    travelStyle,
                    interests: interest,
                    budget,
                    groupType,
                    userId: user?._id
                })
            });

            const result = await res.json();

            if(res.ok && result?.data?.tripId){
                navigate(`/admin/trips/${result.data.tripId}`);
            }else{
                console.error("Trip generation failed");
                setError("Trip generation failed");
            }
            
        } catch (error) {
            console.error("Error generating trips",error)
            setError("Something went wrong. Please try again.");
        }finally{
            setLoading(false)
        }
    }
    const handleChange =(key,value) => {
        setFormData({ ... formData, [key]: value})
    }

    return (
       <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header title="Add a New Trip" description="View and edit AI Genereated Travel Plans" />
            <section className="mt-2.5 wrapper-md">
                <form className="trip-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="country">
                            Country
                        </label>
                        <ComboBoxComponent
                            id="country"
                            dataSource={countryData}
                            fields={{text: 'text', value:'value'}}
                            placeholder="Select a Country"
                            className="combo-box"
                            change={(e) => {
                                if(e.value){
                                    handleChange('country', e.value)
                                }
                            }}
                            allowFiltering
                            filtering={(e) => {
                                const query = e.text.toLowerCase();

                                e.updateData(
                                    countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => ({
                                        text: country.name,
                                        value: country.value
                                    })))
                                )
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input 
                            type="number"
                            name="duration" 
                            id="duration" 
                            placeholder="Enter number of days(5, 12...)" 
                            className="form-input placeholder:text-gray-100"
                            onChange={(e) => handleChange('duration',Number(e.target.value))}
                        />
                    </div>

                    {selectItems.map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{formatKey(key)}</label>
                            <ComboBoxComponent 
                                id={key}
                                dataSource={comboBoxItems[key].map((item) => ({
                                    text:item,
                                    value:item
                                }))}
                                fields={{text:'text', value:'value'}}
                                placeholder={`Select ${formatKey(key)}`}
                                change={(e) => {
                                    if(e.value){
                                        handleChange(key, e.value)
                                    }
                                }}
                                allowFiltering
                                filtering={(e) => {
                                    const query = e.text.toLowerCase();
                                    e.updateData(
                                        comboBoxItems[key].filter((item) => item.toLowerCase().includes(query)).map(((item) => ({
                                            text: item,
                                            value: item
                                        })))
                                    )
                                }}
                                className="combo-box"
                            />
                        </div>
                    ))}

                    <div>
                        <label htmlFor="location">
                            Location on the world map
                        </label>
                        <MapsComponent>
                            <LayersDirective>
                                <LayerDirective
                                    shapeData={world_map}
                                    dataSource={mapData}
                                    shapePropertyPath="name"
                                    shapeDataPath="country"
                                    shapeSettings={{colorValuePath: 'color', fill: '#e5e5e5'}}
                                />
                            </LayersDirective>
                        </MapsComponent>
                    </div>

                    <div className="bg-gray-200 h-px w-full"/>

                    {error && (
                        <div className="error">
                            <p> {error} </p>
                        </div>
                    )}
                    <footer className="px-6 w-full">
                        <ButtonComponent
                            type="submit"
                            className="button-class !h-12 !w-full"
                            disabled={loading}
                        >
                            <img 
                                src={`/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} 
                                alt="generate" 
                                className={cn('size-5', {'animate-spin' : loading})} 
                            />
                            <span className="p-16-semibold text-white"> 
                                {loading ? 'Generating...' : 'Generate Trip'}
                            </span>
                        </ButtonComponent>
                    </footer>
                </form>
            </section>
       </main>
    );
}

export default CreateTrips