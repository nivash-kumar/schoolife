

// Subjects List Algorithm
// Fetch all subjects from subjects collection.

// Return data to client, optionally with middleware for access control.
const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controller/storeController');

storeRouter.get("/", storeController.index);
storeRouter.get("/students", storeController.dev);
storeRouter.get("/teachers", storeController.dev);
storeRouter.get("/admin", storeController.dev);
storeRouter.get("/subjects", storeController.dev);

module.exports = storeRouter;