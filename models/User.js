import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, trim: true,},
    firstName: { type: String, trim: true, required: [true, 'First name is required'] },
    lastName: { type: String, trim: true, required: [true, 'Last name is required'] },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: Number, required: true },
    address: { 
        street: String,
        city: String,
        country: { type: String, required: true }
    },
    image: { type: String, default: "https://www.gravatar.com/avatar/?d=mp" },
    socialLinks: [
        {
            platform: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    bio: String,
    summary: String,
    age: Number,
}, { timestamps: true });

// we are using pre-save hook to set the userName field it will set userName in the DB
// we can use virtuals to compute the userName field but it will not be saved in the DB
// will keep it as it is for learning purposes

userSchema.pre('save', function (next) {
    if (this.firstName && this.lastName) {
        this.userName = `${this.firstName.toLowerCase()} ${this.lastName.toLowerCase()}`;
    }
    next();
})

export default mongoose.model("User", userSchema);