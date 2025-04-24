import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Skill name is required'] },
    experienceYears: { type: Number, min: 0 },
    rating: { type: Number, min: 0, max: 10 },
    description: { type: String, trim: true },
    categoryId: { type: mongoose.Types.ObjectId, ref: 'skillCategorySchema', required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});


const skillCategorySchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Category name is required'] },
    description: { type: String, trim: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    skillId: { type: mongoose.Types.ObjectId, ref: 'Skill', required: true }
}, { timestamps: true });


const Skill = mongoose.model('Skill', skillSchema);
export default Skill;