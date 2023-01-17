const express = require('express');
const { createOnePlace } = require('../models/places');

const router = express.Router();

// Create a new holiday place.
router.post('/', (req, res) => {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const description = req?.body?.description?.length !== 0 ? req.body.description : undefined;

  if (!name || !description) {
    return res.sendStatus(400);
  }

  const createdPizza = createOnePlace(name, description);

  return res.json(createdPizza);
});

module.exports = router;
