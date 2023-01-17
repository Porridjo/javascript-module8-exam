const express = require('express');
const { register, findUserById, addPlaceToFavorite } = require('../models/users');
const { findPlaceById } = require('../models/places');

const router = express.Router();

/* Register a user */
router.post('/register', (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;

  if (!username || !email) return res.sendStatus(400); // 400 Bad Request

  const createdUser = register(username, email);

  if (!createdUser) return res.sendStatus(409); // 409 Conflict

  return res.json({ id: createdUser.id });
});

// add to favorites
router.patch('/favorite', (req, res) => {
  const userId = req?.body?.userId;
  const placeId = req?.body?.placeId;

  let alreadyHasInFavorite = false;

  const place = findPlaceById(placeId);
  const user = findUserById(userId);

  if (!place || !user) {
    return res.sendStatus(400);
  }

  user.favorites.forEach((favoritePlace) => {
    if (favoritePlace === place.name) {
      alreadyHasInFavorite = true;
    }
  });

  if (alreadyHasInFavorite) {
    return res.sendStatus(409);
  }

  const updatedUser = addPlaceToFavorite(user, place.name);

  return res.json(updatedUser);
});

module.exports = router;
