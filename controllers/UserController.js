const Users = require('../models/UserModel');
const { getPostData } = require('../utils');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

//Get single user
const getUserById = async (req, res, id) => {
  try {
    const user = await Users.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found.' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }

  } catch (error) {
    console.log(error);
  }
}

//Create a user
const createUser = async (req, res) => {
  try {

    const body = await getPostData(req);
    const { name, email, password } = JSON.parse(body);
    const user = {
      name,
      email,
      password
    }
    const newUser = await Users.create(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newUser));

  } catch (error) {
    console.log(error);
  }
}

//Update a user
const updateUser = async (req, res, id) => {
  try {
    const user = await Users.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found.' }));
    } else {

      const body = await getPostData(req);
      const { name, email, password } = JSON.parse(body);
      const userData = {
        name,
        email,
        password
      }
      const updatedUser = await Users.update(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedUser));
    }

  } catch (error) {
    console.log(error);
  }
}

//Get single user
const deleteUser = async (req, res, id) => {
  try {
    const user = await Users.findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found.' }));
    } else {
      await Users.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} removed.` }));
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}