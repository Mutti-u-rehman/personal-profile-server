import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Project name is required'] },
    description: { type: String, trim: true },
    role: { type: String, trim: true },
    techStacks: [{ type: String, trim: true }],
    keyResponsibilities: [{ type: String, trim: true }],
    codeBaseLink: { type: String, trim: true },
    liveLink: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    image: { type: Blob, trim: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;