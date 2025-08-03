import Razorpay from "razorpay";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", tripId, userId } = req.body;
        if (amount > 500000) {
            throw new ApiError(400, "Amount exceeds max allowed")
        }

        const options = {
            amount: amount * 100, // in paisa
            currency,
            receipt: `receipt_${tripId}`,
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json(
            new ApiResponse(200, {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID,
                tripId,
            }, "Order created")
        );
    } catch (err) {
        console.error(err)
        throw new ApiError(500,`Error generating order : ${err.error.description}`)
    }
};
