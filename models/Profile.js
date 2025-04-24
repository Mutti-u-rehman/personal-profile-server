import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    isPublic: { type: Boolean, default: false },
    theme: { type: String, default: 'light' },
    layoutConfig: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;


// WIP: Define a complete schema for LayoutConfig, 
// that will change the headers, add and remove components and others