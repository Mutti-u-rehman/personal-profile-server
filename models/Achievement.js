import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Achievement name is required'] },
    link: { type: String, trim: true },
    image: { type: Blob, trim: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

achievementSchema.index({ userId: 1 });

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;