import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Hobby name is required'] },
    description: { type: String, trim: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// this will create an index on userId field
// this will help in searching the hobbies by userId
hobbySchema.index({ userId: 1 });

const Hobby = mongoose.model("Hobby", hobbySchema);
export default Hobby;