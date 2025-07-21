import mongoose,{Schema} from "mongoose";

const tripSchema = new Schema(
    {
        tripDeatail: {
            type: String,
            required: true
        },
        imageUrls: [
            {
                type: String
            }
        ],
        payment_link: {
            type: String,
            trim: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps:true
    }
)

export const Trip = mongoose.model("Trip" ,tripSchema)