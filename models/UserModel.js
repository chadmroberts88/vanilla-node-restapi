let users = require('../users');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === id);
    resolve(user);
  })
}

const create = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile('./users.json', users);
    resolve(newUser);
  })
}

const update = (id, user) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((u) => u.id === id);
    users[index] = { id, ...user };
    writeDataToFile('./users.json', users);
    resolve(users[index]);
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    users = users.filter((u) => u.id !== id);
    writeDataToFile('./users.json', users);
    resolve();
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}