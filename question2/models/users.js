const path = require('node:path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const escape = require('escape-html');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/users.json');

function register(username, email) {
  const userFound = findUserByEmail(email);
  if (userFound) {
    return undefined;
  }

  const createdUser = createOneUser(username, email);

  return createdUser;
}

function findUserByEmail(email) {
  const users = parse(jsonDbPath);
  const indexOfUserFound = users.findIndex((user) => user.email === email);
  if (indexOfUserFound < 0) {
    return undefined;
  }
  return users[indexOfUserFound];
}

function findUserById(id) {
  const users = parse(jsonDbPath);
  const indexOfUserFound = users.findIndex((user) => user.id === id);
  if (indexOfUserFound < 0) {
    return undefined;
  }
  return users[indexOfUserFound];
}

function createOneUser(username, email) {
  const users = parse(jsonDbPath);

  const createdUser = {
    id: uuidv4(),
    username: escape(username),
    email: escape(email),
    favorites: [],
  };
  users.push(createdUser);
  serialize(jsonDbPath, users);

  return createdUser;
}

function addPlaceToFavorite(user, placeName) {
  const users = parse(jsonDbPath);
  const indexOfUserFound = users.findIndex((e) => e.id === user.id);

  user.favorites.push(placeName);

  users[indexOfUserFound] = user;
  serialize(jsonDbPath, users);

  return users;
}

module.exports = {
  register,
  findUserById,
  addPlaceToFavorite,
};
