import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createRazorpayOrder, fetchTripById, parseTripData } from "../lib/utils";
import { Header, Loader } from "../../components";


function TravelPayment() {
    const { travelId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const {trip, err} = await fetchTripById(travelId);
                setTrip(trip);
                setError(err);
            } catch (error) {
                console.error("Error loading trip", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [travelId]);

    if (loading) {
        return (
            <main className="h-screen w-screen flex flex-col flex-center wrapper">
                <Loader />
            </main>
        );
    }
    if (error) {
        return (
            <main className="mt-25 wrapper h-screen w-screen">
            <Header title="Trip Details" description="Error loading trip payment" />
            <p className="text-center text-red-500">{error}</p>
            </main>
        );
    }

    const imageUrls = trip?.imageUrls || [];
    const tripData = parseTripData(trip.tripDetail);
    const {
        name, duration,travelStyle,estimatedPrice,
        description, country
    } = tripData || {};

    const handlePayment = async () => {

        try {
            const { order, err } = await createRazorpayOrder(
                    parseInt(estimatedPrice.replace("₹", "")),
                    travelId
                );

                if (err || !order) {
                console.error("Payment error:", err);
                setError(err)
                return;
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Wander Wise",
                description: name,
                image: "/img/logo3.png",
                order_id: order.orderId,
                handler: function (response) {
                    navigate(`/travel/${travelId}/success`, {
                        state: {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                        }
                    });
                },
                prefill: {
                    name: "Your Name",
                    email: "user@example.com"
                },
                theme: {
                color: "#4F46E5"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (err) {
            console.error("Payment error:", err);
        }
    };

    return (
        <main className="p-6 min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
                <div className="space-y-2">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <p className="text-xl font-semibold text-indigo-600">
                    Price: {estimatedPrice}
                </p>
                </div>

                <img src={imageUrls?.[0]} alt="Trip Banner" className="w-full h-64 object-cover rounded-lg shadow" />

                <button
                    onClick={handlePayment}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg"
                >
                    Proceed to Payment
                </button>
            </div>
        </main>
    );
}

export default TravelPayment;