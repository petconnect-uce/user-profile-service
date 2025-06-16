const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Relación con el auth-service
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  bio: String,
  location: String,
  profilePicture: String, // URL de la imagen
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
