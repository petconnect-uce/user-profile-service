const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserProfile = require('../models/UserProfile.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// Crear perfil
router.post('/', authMiddleware, async (req, res) => {

  const { fullName, bio, location, profilePicture } = req.body;

  try {
    const existingProfile = await UserProfile.findOne({ userId: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const profile = new UserProfile({
      userId: req.user.id,
      fullName,
      bio,
      location,
      profilePicture
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Obtener perfil
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Actualizar perfil con validaciones
router.put( '/',
  authMiddleware,
  [
    body('fullName').optional().isLength({ min: 3 }).withMessage('Full name must be at least 3 characters'),
    body('bio').optional().isLength({ max: 500 }).withMessage('Bio can be up to 500 characters'),
    body('location').optional().isString().withMessage('Location must be a string'),
    body('profilePicture').optional().isURL().withMessage('Profile picture must be a valid URL')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, bio, location, profilePicture } = req.body;

    try {
      const profile = await UserProfile.findOneAndUpdate(
        { userId: req.user.id },
        { fullName, bio, location, profilePicture },
        { new: true }
      );

      if (!profile) return res.status(404).json({ message: 'Profile not found' });

      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Eliminar perfil
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const result = await UserProfile.findOneAndDelete({ userId: req.user.id });
    if (!result) return res.status(404).json({ message: 'Profile not found' });

    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
