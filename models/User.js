import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    avatar: { type: String, default: "https://www.gravatar.com/avatar/?d=mp" },
}, { timestamps: true });


export default mongoose.model("User", userSchema);