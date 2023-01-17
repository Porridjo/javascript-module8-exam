const path = require('node:path');
const escape = require('escape-html');
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/places.json');

function createOnePlace(name, description) {
  const places = parse(jsonDbPath);

  const createdPlace = {
    id: uuidv4(),
    name: escape(name),
    description: escape(description),
  };

  places.push(createdPlace);

  serialize(jsonDbPath, places);

  return createdPlace.id;
}

function findPlaceById(id) {
  const places = parse(jsonDbPath);
  const indexOfPlaceFound = places.findIndex((place) => place.id === id);
  if (indexOfPlaceFound < 0) {
    return undefined;
  }
  return places[indexOfPlaceFound];
}

module.exports = {
  createOnePlace,
  findPlaceById,
};
