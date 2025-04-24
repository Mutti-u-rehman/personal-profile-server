import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;